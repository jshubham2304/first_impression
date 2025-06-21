import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import type { VisualizerColor } from '@/lib/types';

const COLORS_COLLECTION = 'visualizer-colors';

export async function getVisualizerColors(): Promise<VisualizerColor[]> {
    const collectionRef = collection(db, COLORS_COLLECTION);
    const q = query(collectionRef, orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as VisualizerColor[];
}

type ColorData = Omit<VisualizerColor, 'id'>;

export async function addVisualizerColor(data: ColorData) {
    const collectionRef = collection(db, COLORS_COLLECTION);
    const newDocRef = await addDoc(collectionRef, data);
    return newDocRef.id;
}

export async function updateVisualizerColor(id: string, data: Partial<ColorData>) {
    const docRef = doc(db, COLORS_COLLECTION, id);
    await updateDoc(docRef, data);
}

export async function deleteVisualizerColor(id: string) {
    const docRef = doc(db, COLORS_COLLECTION, id);
    await deleteDoc(docRef);
}
