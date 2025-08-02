'use server';

import type { VisualizerColor } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore';

const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

if (USE_FIREBASE) {
    console.log('Visualizer Color Service: Using Firebase');
} else {
    console.log('Visualizer Color Service: Using Mock Data');
}

type ColorData = Omit<VisualizerColor, 'id'>;

// --- Mock Data ---
let mockColors: VisualizerColor[] = [
  { id: 'color-1', name: 'Sea Salt', hex: '#a7b4a8' },
  { id: 'color-2', name: 'Light Sky', hex: '#d5e2ea' },
  { id: 'color-3', name: 'Sandy Tan', hex: '#e3d5c1' },
  { id: 'color-4', name: 'Deep Ocean', hex: '#4f6d7a' },
  { id: 'color-5', name: 'Terracotta', hex: '#c97b61' },
  { id: 'color-6', name: 'Olive Green', hex: '#7a8a6b' },
];

// --- Firebase Implementation ---

const colorsCollection = collection(db, 'visualizerColors');

const getVisualizerColorsFirebase = async (): Promise<VisualizerColor[]> => {
    const q = query(colorsCollection, orderBy('name'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VisualizerColor));
};

const addVisualizerColorFirebase = async (data: ColorData): Promise<string> => {
    const docRef = await addDoc(colorsCollection, data);
    return docRef.id;
};

const updateVisualizerColorFirebase = async (id: string, data: Partial<ColorData>): Promise<void> => {
    const docRef = doc(db, 'visualizerColors', id);
    await updateDoc(docRef, data);
};

const deleteVisualizerColorFirebase = async (id: string): Promise<void> => {
    const docRef = doc(db, 'visualizerColors', id);
    await deleteDoc(docRef);
};


// --- Mock Implementation ---

const getVisualizerColorsMock = async (): Promise<VisualizerColor[]> => {
    return Promise.resolve(mockColors.sort((a,b) => a.name.localeCompare(b.name)));
};

const addVisualizerColorMock = async (data: ColorData): Promise<string> => {
    const newColor = { ...data, id: uuidv4() };
    mockColors.push(newColor);
    return Promise.resolve(newColor.id);
};

const updateVisualizerColorMock = async (id: string, data: Partial<ColorData>): Promise<void> => {
    const colorIndex = mockColors.findIndex(c => c.id === id);
    if(colorIndex > -1) {
        mockColors[colorIndex] = { ...mockColors[colorIndex], ...data };
    }
    return Promise.resolve();
};

const deleteVisualizerColorMock = async (id: string): Promise<void> => {
    mockColors = mockColors.filter(c => c.id !== id);
    return Promise.resolve();
};

// --- Exports ---

export const getVisualizerColors = USE_FIREBASE ? getVisualizerColorsFirebase : getVisualizerColorsMock;
export const addVisualizerColor = USE_FIREBASE ? addVisualizerColorFirebase : addVisualizerColorMock;
export const updateVisualizerColor = USE_FIREBASE ? updateVisualizerColorFirebase : updateVisualizerColorMock;
export const deleteVisualizerColor = USE_FIREBASE ? deleteVisualizerColorFirebase : deleteVisualizerColorMock;
