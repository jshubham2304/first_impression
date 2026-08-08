'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { FileVideo, ImageIcon, Loader2, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { galleryCategories, type GalleryCategory, type GalleryItem } from '@/lib/types';
import { compressImageToHalf, compressVideoToHalf } from '@/lib/media-compression';
import { deleteGalleryItem, getGalleryItems, uploadGalleryItem } from '@/services/gallery-service';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<GalleryCategory>('interior');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState<'idle' | 'compressing' | 'uploading'>('idle');
  const { toast } = useToast();

  const refresh = async () => {
    try { setItems(await getGalleryItems()); }
    catch { toast({ title: 'Could not load gallery', description: 'Check Firestore permissions and try again.', variant: 'destructive' }); }
  };
  useEffect(() => { refresh(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    if (selected && !selected.type.startsWith('image/') && !selected.type.startsWith('video/')) {
      toast({ title: 'Unsupported file', description: 'Choose an image or video file.', variant: 'destructive' });
      event.target.value = '';
      return;
    }
    setFile(selected);
    if (selected) {
      // A useful first draft which remains fully editable by the admin.
      const generatedTitle = selected.name
        .replace(/\.[^.]+$/, '')
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, letter => letter.toUpperCase());
      setTitle(generatedTitle);
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file || !title.trim()) return;
    setIsSubmitting(true);
    const isImage = file.type.startsWith('image/');
    const needsCompression = !isImage || file.size > 5 * 1024 * 1024;
    setUploadStage(needsCompression ? 'compressing' : 'uploading');
    setProgress(5);
    try {
      // Images up to 5 MB are uploaded straight away. Larger images and every
      // video are compressed before upload to protect Firebase Storage usage.
      const compressed = needsCompression
        ? (isImage ? await compressImageToHalf(file) : await compressVideoToHalf(file))
        : file;
      const uploadStart = needsCompression ? 30 : 5;
      setUploadStage('uploading');
      setProgress(uploadStart);
      await uploadGalleryItem(
        { type: isImage ? 'image' : 'video', title: title.trim(), location: location.trim() || undefined, category, featured: true },
        compressed,
        file.size,
        uploadProgress => setProgress(uploadStart + Math.round(uploadProgress * (100 - uploadStart) / 100)),
      );
      setProgress(100);
      toast({ title: 'Added to gallery', description: `${file.type.startsWith('image/') ? 'Image' : 'Video'} was compressed before upload.` });
      setFile(null); setTitle(''); setLocation(''); setProgress(0);
      const input = document.getElementById('gallery-file') as HTMLInputElement | null;
      if (input) input.value = '';
      await refresh();
    } catch (error) {
      toast({ title: 'Upload failed', description: error instanceof Error ? error.message : 'Please try again.', variant: 'destructive' });
    } finally { setIsSubmitting(false); setUploadStage('idle'); }
  };

  const remove = async (item: GalleryItem) => {
    if (!window.confirm(`Remove “${item.title}” from the gallery?`)) return;
    try { await deleteGalleryItem(item); setItems(current => current.filter(currentItem => currentItem.id !== item.id)); toast({ title: 'Gallery item removed' }); }
    catch { toast({ title: 'Could not remove item', description: 'Check Firebase Storage and Firestore permissions.', variant: 'destructive' }); }
  };

  return <div className="space-y-6">
    <div><h1 className="text-3xl font-bold">Gallery</h1><p className="text-muted-foreground mt-1">Add portfolio images and videos. Every upload is compressed to a 50% target before it reaches Firebase Storage.</p></div>
    <Card>
      <CardHeader><CardTitle>Add gallery media</CardTitle><CardDescription>Images use 50% quality; videos are re-encoded and only uploaded if they are at most 50% of the original file size.</CardDescription></CardHeader>
      <CardContent><form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2"><Label htmlFor="gallery-file">Image or video</Label><Input id="gallery-file" type="file" accept="image/*,video/*" onChange={selectFile} disabled={isSubmitting} required />{file && <p className="text-sm text-muted-foreground">{file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB</p>}</div>
        <div className="space-y-2"><Label htmlFor="gallery-title">Title</Label><Input id="gallery-title" value={title} onChange={event => setTitle(event.target.value)} disabled={isSubmitting} required /></div>
        <div className="space-y-2"><Label htmlFor="gallery-location">Location (optional)</Label><Input id="gallery-location" value={location} onChange={event => setLocation(event.target.value)} disabled={isSubmitting} /></div>
        <div className="space-y-2"><Label htmlFor="gallery-category">Category</Label><select id="gallery-category" value={category} onChange={event => setCategory(event.target.value as GalleryCategory)} disabled={isSubmitting} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">{galleryCategories.map(value => <option key={value} value={value}>{value === 'wood' ? 'Wood & Metal' : value[0].toUpperCase() + value.slice(1)}</option>)}</select></div>
        {isSubmitting && <div className="space-y-2 md:col-span-2"><div className="flex justify-between text-sm"><span>{uploadStage === 'compressing' ? 'Compressing to 50%…' : 'Uploading to Firebase Storage…'}</span><span>{progress}%</span></div><Progress value={progress} />{file?.type.startsWith('video/') && uploadStage === 'compressing' && <p className="text-xs text-muted-foreground">Video compression can take about as long as the video duration.</p>}{file?.type.startsWith('image/') && file.size <= 5 * 1024 * 1024 && <p className="text-xs text-muted-foreground">This image is under 5 MB, so it is uploading directly without compression.</p>}</div>}
        <div className="md:col-span-2"><Button type="submit" disabled={!file || !title.trim() || isSubmitting}>{isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}Compress and upload</Button></div>
      </form></CardContent>
    </Card>
    <Card><CardHeader><CardTitle>Uploaded media</CardTitle><CardDescription>{items.length} dynamically managed item{items.length === 1 ? '' : 's'}</CardDescription></CardHeader><CardContent>
      {items.length === 0 ? <p className="py-8 text-center text-muted-foreground">No Firebase gallery items yet.</p> : <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map(item => <div key={item.id} className="overflow-hidden rounded-lg border bg-card"><div className="relative aspect-video bg-muted">{item.type === 'image' ? <Image src={item.src} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" /> : <video src={item.src} className="h-full w-full object-cover" muted />}</div><div className="flex items-center justify-between gap-3 p-3"><div className="min-w-0"><p className="truncate font-medium">{item.title}</p><p className="text-xs text-muted-foreground">{item.type === 'image' ? <ImageIcon className="mr-1 inline h-3 w-3" /> : <FileVideo className="mr-1 inline h-3 w-3" />}{item.category} {item.compressedSize ? `· ${(item.compressedSize / 1024 / 1024).toFixed(2)} MB` : ''}</p></div><Button variant="ghost" size="icon" className="shrink-0 text-destructive" onClick={() => remove(item)} aria-label={`Delete ${item.title}`}><Trash2 className="h-4 w-4" /></Button></div></div>)}</div>}
    </CardContent></Card>
  </div>;
}
