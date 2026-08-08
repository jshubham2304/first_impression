import { addDoc, collection, deleteDoc, getDocs, orderBy, query, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { GalleryItem } from '@/lib/types';

const galleryCollection = collection(db, 'gallery');

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const snapshot = await getDocs(query(galleryCollection, orderBy('createdAt', 'desc')));
  return snapshot.docs.map(snapshotDoc => ({ id: snapshotDoc.id, ...snapshotDoc.data() } as GalleryItem));
}

export async function uploadGalleryItem(
  item: Omit<GalleryItem, 'id' | 'src' | 'storagePath' | 'cloudinaryPublicId' | 'createdAt'>,
  file: File,
  originalSize: number,
  onProgress: (progress: number) => void,
): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);
  const result = await new Promise<{ src: string; publicId: string }>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('POST', '/api/gallery/upload');
    request.upload.onprogress = event => event.lengthComputable && onProgress(Math.round(event.loaded / event.total * 100));
    request.onerror = () => reject(new Error('Could not reach the upload server.'));
    request.onload = () => {
      const response = JSON.parse(request.responseText || '{}') as { src?: string; publicId?: string; error?: string };
      if (request.status >= 200 && request.status < 300 && response.src && response.publicId) resolve({ src: response.src, publicId: response.publicId });
      else reject(new Error(response.error || 'Cloudinary upload failed.'));
    };
    request.send(formData);
  });
  await addDoc(galleryCollection, { ...item, src: result.src, cloudinaryPublicId: result.publicId, originalSize, compressedSize: file.size, createdAt: Date.now() });
}

export async function deleteGalleryItem(item: GalleryItem): Promise<void> {
  if (!item.id) throw new Error('Only Firebase gallery items can be deleted.');
  if (item.cloudinaryPublicId) {
    const response = await fetch('/api/gallery/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ publicId: item.cloudinaryPublicId, resourceType: item.type }) });
    if (!response.ok) throw new Error('Could not remove file from Cloudinary.');
  }
  await deleteDoc(doc(db, 'gallery', item.id));
}
