'use server';

import type { VisualizerColor } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, orderBy, query, setDoc } from 'firebase/firestore';

type ColorData = Omit<VisualizerColor, 'id'>;

const defaultColors: VisualizerColor[] = [];

// --- Firebase Implementation ---

export const getVisualizerColors = async (): Promise<VisualizerColor[]> => {
    try {
        const colorsCollection = collection(db, 'visualizerColors');
        const q = query(colorsCollection, orderBy('name'));
        const snapshot = await getDocs(q);
        const colors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VisualizerColor));

        if (colors.length === 0) {
            return [];
        }
        
        return colors;
    } catch (error) {
        console.error("Failed to fetch visualizer colors from Firebase, returning default colors.", error);
        // This often happens during build time due to lack of Firebase permissions.
        // Returning default data allows the build to succeed.
        return defaultColors;
    }
};

export const addVisualizerColor = async (data: ColorData): Promise<string> => {
    const colorsCollection = collection(db, 'visualizerColors');
    const docRef = await addDoc(colorsCollection, data);
    return docRef.id;
};

export const updateVisualizerColor = async (id: string, data: Partial<ColorData>): Promise<void> => {
    const docRef = doc(db, 'visualizerColors', id);
    await updateDoc(docRef, data);
};

export const deleteVisualizerColor = async (id: string): Promise<void> => {
    const docRef = doc(db, 'visualizerColors', id);
    await deleteDoc(docRef);
};
