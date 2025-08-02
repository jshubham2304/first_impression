'use server';

import type { VisualizerColor } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, orderBy, query, setDoc } from 'firebase/firestore';

type ColorData = Omit<VisualizerColor, 'id'>;

// --- Firebase Implementation ---

export const getVisualizerColors = async (): Promise<VisualizerColor[]> => {
    const colorsCollection = collection(db, 'visualizerColors');
    const q = query(colorsCollection, orderBy('name'));
    const snapshot = await getDocs(q);
    const colors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VisualizerColor));

    if (colors.length === 0) {
        console.log("No visualizer colors found in Firebase. Creating default colors.");
        const defaultColors: VisualizerColor[] = [
            { id: 'color-1', name: 'Sea Salt', hex: '#a7b4a8' },
            { id: 'color-2', name: 'Light Sky', hex: '#d5e2ea' },
            { id: 'color-3', name: 'Sandy Tan', hex: '#e3d5c1' },
            { id: 'color-4', name: 'Deep Ocean', hex: '#4f6d7a' },
            { id: 'color-5', name: 'Terracotta', hex: '#c97b61' },
            { id: 'color-6', name: 'Olive Green', hex: '#7a8a6b' },
        ];
        for (const color of defaultColors) {
            await setDoc(doc(db, 'visualizerColors', color.id), color);
        }
        return defaultColors;
    }
    
    return colors;
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
