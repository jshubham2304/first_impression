'use server';

import type { EstimationRequest } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '@/lib/firebase';
import { collection, getDocs, doc, addDoc, deleteDoc, query, orderBy, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

if (USE_FIREBASE) {
    console.log('Estimation Service: Using Firebase');
} else {
    console.log('Estimation Service: Using Mock Data');
}

type EstimationFormData = Omit<EstimationRequest, 'id' | 'createdAt' | 'photoUrl' | 'photoPath'>;

// --- Mock Data ---
let mockEstimations: EstimationRequest[] = [];


// --- Firebase Implementation ---

const estimationsCollection = collection(db, 'estimations');

const getEstimationsFirebase = async (): Promise<EstimationRequest[]> => {
    const q = query(estimationsCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EstimationRequest));
};

const addEstimationRequestFirebase = async (data: EstimationFormData, photoFile?: File): Promise<string> => {
    const newEstimation: Omit<EstimationRequest, 'id'> = {
        ...data,
        createdAt: new Date().toISOString(),
    };

    if (photoFile) {
        const imagePath = `estimations/${uuidv4()}/${photoFile.name}`;
        const storageRef = ref(storage, imagePath);
        await uploadBytes(storageRef, photoFile);
        newEstimation.photoUrl = await getDownloadURL(storageRef);
        newEstimation.photoPath = imagePath;
    }

    const docRef = await addDoc(estimationsCollection, newEstimation);
    return docRef.id;
};

const deleteEstimationRequestFirebase = async (estimationId: string): Promise<void> => {
    const docRef = doc(db, 'estimations', estimationId);
    const estimationSnap = await getDoc(docRef);
    if (!estimationSnap.exists()) {
        console.error(`Estimation with id ${estimationId} not found.`);
        return;
    }
    const estimation = estimationSnap.data() as EstimationRequest;

    if (estimation.photoPath) {
        await deleteObject(ref(storage, estimation.photoPath));
    }
    await deleteDoc(docRef);
};


// --- Mock Implementation ---

const getEstimationsMock = async (): Promise<EstimationRequest[]> => {
    const sorted = [...mockEstimations].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return Promise.resolve(sorted);
};

const addEstimationRequestMock = async (data: EstimationFormData, photoFile?: File): Promise<string> => {
    const newEstimation: EstimationRequest = {
        id: uuidv4(),
        ...data,
        createdAt: new Date().toISOString(),
        photoUrl: photoFile ? URL.createObjectURL(photoFile) : undefined, // In-memory URL
        photoPath: photoFile ? photoFile.name : undefined,
    };
    mockEstimations.push(newEstimation);
    return Promise.resolve(newEstimation.id);
};

const deleteEstimationRequestMock = async (estimationId: string): Promise<void> => {
    mockEstimations = mockEstimations.filter(req => req.id !== estimationId);
    return Promise.resolve();
};

// --- Exports ---

export const getEstimations = USE_FIREBASE ? getEstimationsFirebase : getEstimationsMock;
export const addEstimationRequest = USE_FIREBASE ? addEstimationRequestFirebase : addEstimationRequestMock;
export const deleteEstimationRequest = USE_FIREBASE ? deleteEstimationRequestFirebase : deleteEstimationRequestMock;
