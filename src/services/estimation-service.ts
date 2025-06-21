'use server';

import { db, storage } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, getDoc, query, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import type { EstimationRequest } from '@/lib/types';

const ESTIMATIONS_COLLECTION = 'estimationRequests';

export async function getEstimations(): Promise<EstimationRequest[]> {
    const collectionRef = collection(db, ESTIMATIONS_COLLECTION);
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
        } as EstimationRequest
    });
}

async function uploadPhoto(photoFile: File, estimationId: string): Promise<{ photoUrl: string, photoPath: string }> {
    const photoPath = `estimations/${estimationId}/${photoFile.name}`;
    const storageRef = ref(storage, photoPath);
    await uploadBytes(storageRef, photoFile);
    const photoUrl = await getDownloadURL(storageRef);
    return { photoUrl, photoPath };
}

type EstimationFormData = Omit<EstimationRequest, 'id' | 'createdAt' | 'photoUrl' | 'photoPath'>;

export async function addEstimationRequest(data: EstimationFormData, photoFile?: File): Promise<string> {
    const dataToSave = {
        ...data,
        createdAt: serverTimestamp()
    };
    
    const newDocRef = await addDoc(collection(db, ESTIMATIONS_COLLECTION), dataToSave);
    
    if (photoFile) {
        const { photoUrl, photoPath } = await uploadPhoto(photoFile, newDocRef.id);
        await updateDoc(newDocRef, { photoUrl, photoPath });
    }
    
    return newDocRef.id;
}


export async function deleteEstimationRequest(estimationId: string) {
    const docRef = doc(db, ESTIMATIONS_COLLECTION, estimationId);
    
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.photoPath) {
             try {
                const photoRef = ref(storage, data.photoPath);
                await deleteObject(photoRef);
            } catch (error: any) {
                 if (error.code !== 'storage/object-not-found') {
                    console.error("Error deleting estimation photo:", error);
                 }
            }
        }
    }

    await deleteDoc(docRef);
}
