'use client';

/** Compresses an image to no more than 50% of its original size before upload. */
export async function compressImageToHalf(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  const maxDimension = 2560;
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const type = file.type === 'image/png' ? 'image/webp' : 'image/jpeg';
  const targetBytes = Math.floor(file.size * 0.5);
  let blob: Blob | undefined;
  // Start at the requested 50% quality, then lower quality only when needed to
  // guarantee that the uploaded file is at most half the original size.
  for (const quality of [0.5, 0.4, 0.3, 0.2, 0.1]) {
    const candidate = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(result => result ? resolve(result) : reject(new Error('Could not compress the image.')), type, quality)
    );
    blob = candidate;
    if (candidate.size <= targetBytes) break;
  }
  if (!blob || blob.size > targetBytes) {
    throw new Error('Image could not be reduced to 50%. Try a larger or less detailed source image.');
  }
  return new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.${type === 'image/webp' ? 'webp' : 'jpg'}`, { type });
}

/**
 * Re-encodes local video in the browser and rejects it if it cannot reach 50%
 * of the input size. This prevents uncompressed videos being uploaded.
 */
export async function compressVideoToHalf(file: File): Promise<File> {
  if (!('MediaRecorder' in window)) {
    throw new Error('This browser cannot compress video. Please use a current Chrome or Edge browser.');
  }
  const objectUrl = URL.createObjectURL(file);
  const video = document.createElement('video');
  video.src = objectUrl;
  video.muted = true;
  video.playsInline = true;
  await new Promise<void>((resolve, reject) => {
    video.onloadedmetadata = () => resolve();
    video.onerror = () => reject(new Error('The selected video could not be read.'));
  });
  const stream = (video as HTMLVideoElement & { captureStream?: () => MediaStream }).captureStream?.();
  if (!stream) {
    URL.revokeObjectURL(objectUrl);
    throw new Error('This browser cannot compress video. Please use a current Chrome or Edge browser.');
  }

  const targetBytes = Math.floor(file.size * 0.5);
  // A conservative bitrate leaves room for container overhead and reaches <= 50% reliably.
  const bitrate = Math.max(150_000, Math.floor((targetBytes * 8 / Math.max(video.duration, 1)) * 0.82));
  const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
    ? 'video/webm;codecs=vp9,opus'
    : 'video/webm';
  const chunks: BlobPart[] = [];
  const recording = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: bitrate, audioBitsPerSecond: 64_000 });
  const result = new Promise<Blob>((resolve, reject) => {
    recording.ondataavailable = event => event.data.size && chunks.push(event.data);
    recording.onerror = () => reject(new Error('Video compression failed.'));
    recording.onstop = () => resolve(new Blob(chunks, { type: mimeType }));
  });
  const finishedPlaying = new Promise<void>(resolve => { video.onended = () => resolve(); });
  recording.start();
  await video.play();
  await finishedPlaying;
  recording.stop();
  const blob = await result;
  stream.getTracks().forEach(track => track.stop());
  URL.revokeObjectURL(objectUrl);
  if (blob.size > targetBytes) {
    throw new Error('Video could not be reduced to 50%. Try a shorter or lower-resolution video.');
  }
  return new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.webm`, { type: mimeType });
}
