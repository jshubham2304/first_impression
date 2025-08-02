'use server';

import type { Testimonial } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

type TestimonialData = Omit<Testimonial, 'id' | 'imageUrl' | 'imagePath'>;

// --- Mock Data ---
let mockTestimonials: Testimonial[] = [
    {
        id: 'test-1',
        author: 'John Doe',
        comment: 'Absolutely transformed our living room. The team was professional, clean, and the results are stunning. Highly recommend!',
        priority: 1,
        imageUrl: `https://api.dicebear.com/7.x/initials/svg?seed=John%20Doe`,
    },
    {
        id: 'test-2',
        author: 'Jane Smith',
        comment: 'The color visualizer tool was a game-changer! It helped us pick the perfect shade for our kitchen. The paint quality is top-notch.',
        priority: 2,
        imageUrl: `https://api.dicebear.com/7.x/initials/svg?seed=Jane%20Smith`,
    }
];

// --- Firebase Implementation ---

const testimonialsCollection = collection(db, 'testimonials');

const getTestimonialsFirebase = async (): Promise<Testimonial[]> => {
    const q = query(testimonialsCollection, orderBy('priority'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
};

const getTestimonialFirebase = async (id: string): Promise<Testimonial | null> => {
    const docRef = doc(db, 'testimonials', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Testimonial : null;
};

const addTestimonialFirebase = async (data: TestimonialData, imageFile?: File): Promise<string> => {
    const newTestimonial: Omit<Testimonial, 'id'> = { ...data };
    
    if (imageFile) {
        const imagePath = `testimonials/${uuidv4()}/${imageFile.name}`;
        const storageRef = ref(storage, imagePath);
        await uploadBytes(storageRef, imageFile);
        newTestimonial.imageUrl = await getDownloadURL(storageRef);
        newTestimonial.imagePath = imagePath;
    } else {
        newTestimonial.imageUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.author)}`;
    }

    const docRef = await addDoc(testimonialsCollection, newTestimonial);
    return docRef.id;
};

const updateTestimonialFirebase = async (id: string, data: Partial<TestimonialData>, imageFile?: File): Promise<void> => {
    const docRef = doc(db, 'testimonials', id);
    const updateData: Partial<Testimonial> = { ...data };

    if (imageFile) {
        const testimonialSnap = await getDoc(docRef);
        const existing = testimonialSnap.data() as Testimonial;
        if (existing.imagePath) {
            await deleteObject(ref(storage, existing.imagePath)).catch(e => console.error("Failed to delete old image", e));
        }

        const imagePath = `testimonials/${id}/${imageFile.name}`;
        const storageRef = ref(storage, imagePath);
        await uploadBytes(storageRef, imageFile);
        updateData.imageUrl = await getDownloadURL(storageRef);
        updateData.imagePath = imagePath;
    }
    
    await updateDoc(docRef, updateData);
};

const deleteTestimonialFirebase = async (id: string): Promise<void> => {
    const docRef = doc(db, 'testimonials', id);
    const testimonialSnap = await getDoc(docRef);
    const testimonial = testimonialSnap.data() as Testimonial;

    if (testimonial.imagePath) {
        await deleteObject(ref(storage, testimonial.imagePath));
    }
    await deleteDoc(docRef);
};


// --- Mock Implementation ---

const getTestimonialsMock = async (): Promise<Testimonial[]> => {
    return Promise.resolve(mockTestimonials.sort((a, b) => a.priority - b.priority));
};

const getTestimonialMock = async (id: string): Promise<Testimonial | null> => {
    return Promise.resolve(mockTestimonials.find(t => t.id === id) || null);
};

const addTestimonialMock = async (data: TestimonialData, imageFile?: File): Promise<string> => {
    const newTestimonial: Testimonial = {
        id: uuidv4(),
        ...data,
        imageUrl: imageFile ? URL.createObjectURL(imageFile) : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.author)}`,
        imagePath: imageFile ? imageFile.name : undefined,
    };
    mockTestimonials.push(newTestimonial);
    return Promise.resolve(newTestimonial.id);
};

const updateTestimonialMock = async (id: string, data: Partial<TestimonialData>, imageFile?: File): Promise<void> => {
    const index = mockTestimonials.findIndex(t => t.id === id);
    if (index === -1) throw new Error("Testimonial not found");

    const updatedTestimonial = { ...mockTestimonials[index], ...data };
    if (imageFile) {
        updatedTestimonial.imageUrl = URL.createObjectURL(imageFile);
        updatedTestimonial.imagePath = imageFile.name;
    }
    mockTestimonials[index] = updatedTestimonial as Testimonial;
    return Promise.resolve();
};

const deleteTestimonialMock = async (id: string): Promise<void> => {
    mockTestimonials = mockTestimonials.filter(t => t.id !== id);
    return Promise.resolve();
};


// --- Exports ---

export const getTestimonials = USE_FIREBASE ? getTestimonialsFirebase : getTestimonialsMock;
export const getTestimonial = USE_FIREBASE ? getTestimonialFirebase : getTestimonialMock;
export const addTestimonial = USE_FIREBASE ? addTestimonialFirebase : addTestimonialMock;
export const updateTestimonial = USE_FIREBASE ? updateTestimonialFirebase : updateTestimonialMock;
export const deleteTestimonial = USE_FIREBASE ? deleteTestimonialFirebase : deleteTestimonialMock;
