'use server';

import type { EstimationRequest } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, addDoc, deleteDoc, query, orderBy, getDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

type EstimationFormData = Omit<EstimationRequest, 'id' | 'createdAt' | 'photoPath'>;

// --- Firebase Implementation ---

export const getEstimations = async (): Promise<EstimationRequest[]> => {
    const estimationsCollection = collection(db, 'estimations');
    const q = query(estimationsCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EstimationRequest));
};

export const addEstimationRequest = async (data: EstimationFormData): Promise<string> => {
    const estimationsCollection = collection(db, 'estimations');
    const newEstimation: Omit<EstimationRequest, 'id' | 'photoPath'> = {
        ...data,
        createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(estimationsCollection, newEstimation);
    return docRef.id;
};

export const deleteEstimationRequest = async (estimationId: string): Promise<void> => {
    const docRef = doc(db, 'estimations', estimationId);
    // const estimationSnap = await getDoc(docRef);
    // if (!estimationSnap.exists()) {
    //     console.error(`Estimation with id ${estimationId} not found.`);
    //     return;
    // }
    // const estimation = estimationSnap.data() as EstimationRequest;

    // if (estimation.photoPath && storage) {
    //     await deleteObject(ref(storage, estimation.photoPath));
    // }
    await deleteDoc(docRef);
};
