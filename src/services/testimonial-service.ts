import { db, storage } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import type { Testimonial } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

const TESTIMONIALS_COLLECTION = 'testimonials';

export async function getTestimonials(): Promise<Testimonial[]> {
    const collectionRef = collection(db, TESTIMONIALS_COLLECTION);
    const q = query(collectionRef, orderBy('priority', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Testimonial[];
}

export async function getTestimonial(id: string): Promise<Testimonial | null> {
    const docRef = doc(db, TESTIMONIALS_COLLECTION, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as Testimonial;
    }
    return null;
}

async function uploadImage(imageFile: File, testimonialId: string): Promise<{ imageUrl: string, imagePath: string }> {
    const imagePath = `testimonials/${testimonialId}/${imageFile.name}`;
    const storageRef = ref(storage, imagePath);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);
    return { imageUrl, imagePath };
}

type TestimonialData = Omit<Testimonial, 'id' | 'imageUrl' | 'imagePath'>;

export async function addTestimonial(data: TestimonialData, imageFile?: File) {
    const testimonialData: Omit<Testimonial, 'id'> = {
        ...data,
        imageUrl: '',
        imagePath: '',
    };

    if (!imageFile) {
        const docRef = await addDoc(collection(db, TESTIMONIALS_COLLECTION), testimonialData);
        return docRef.id;
    }
    
    // If there is an image, we need an ID first to build the storage path
    const tempDocRef = doc(collection(db, TESTIMONIALS_COLLECTION));
    const { imageUrl, imagePath } = await uploadImage(imageFile, tempDocRef.id);
    
    testimonialData.imageUrl = imageUrl;
    testimonialData.imagePath = imagePath;
    
    await updateDoc(tempDocRef, testimonialData);
    
    return tempDocRef.id;
}

export async function updateTestimonial(id: string, data: Partial<TestimonialData>, imageFile?: File) {
    const docRef = doc(db, TESTIMONIALS_COLLECTION, id);
    const updateData: Partial<Testimonial> = { ...data };

    if (imageFile) {
        const existing = await getTestimonial(id);
        if (existing?.imagePath) {
            try {
                await deleteObject(ref(storage, existing.imagePath));
            } catch (error: any) {
                if (error.code !== 'storage/object-not-found') {
                    console.error("Could not delete old image:", error);
                }
            }
        }
        const { imageUrl, imagePath } = await uploadImage(imageFile, id);
        updateData.imageUrl = imageUrl;
        updateData.imagePath = imagePath;
    }

    await updateDoc(docRef, updateData);
}

export async function deleteTestimonial(id: string) {
    const docRef = doc(db, TESTIMONIALS_COLLECTION, id);
    
    try {
        const existing = await getTestimonial(id);
        if (existing?.imagePath) {
            await deleteObject(ref(storage, existing.imagePath));
        }
    } catch (error) {
        console.error("Error deleting testimonial image, continuing to delete document:", error);
    }
    
    await deleteDoc(docRef);
}
