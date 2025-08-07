"use server";

import type { Testimonial } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

type TestimonialData = Omit<Testimonial, "id" | "imagePath">;

const defaultTestimonials: Testimonial[] = [];

// --- Firebase Implementation ---

export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const testimonialsCollection = collection(db, "testimonials");
    const q = query(testimonialsCollection, orderBy("priority"));
    const snapshot = await getDocs(q);
    const testimonials = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Testimonial));

    if (testimonials.length === 0) {
      return [];
    }

    return testimonials;
  } catch (error) {
    console.error("Failed to fetch testimonials from Firebase, returning default testimonials.", error);
    // This often happens during build time due to lack of Firebase permissions.
    // Returning default data allows the build to succeed.
    return defaultTestimonials;
  }
};

export const getTestimonial = async (id: string): Promise<Testimonial | null> => {
  const docRef = doc(db, "testimonials", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Testimonial) : null;
};

export const addTestimonial = async (data: TestimonialData): Promise<string> => {
  const testimonialsCollection = collection(db, "testimonials");
  const newTestimonial: Omit<Testimonial, "id"> = { ...data };

  if (!data.imageUrl) {
    newTestimonial.imageUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.author)}`;
  }

  const docRef = await addDoc(testimonialsCollection, newTestimonial);
  return docRef.id;
};

export const updateTestimonial = async (id: string, data: Partial<TestimonialData>): Promise<void> => {
  const docRef = doc(db, "testimonials", id);
  const updateData: Partial<Testimonial> = { ...data };

  await updateDoc(docRef, updateData);
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  const docRef = doc(db, "testimonials", id);
  // const testimonialSnap = await getDoc(docRef);
  // if (!testimonialSnap.exists()) {
  //     console.error(`Testimonial with id ${id} not found.`);
  //     return;
  // }
  // const testimonial = testimonialSnap.data() as Testimonial;

  // if (testimonial.imagePath && storage) {
  //     await deleteObject(ref(storage, testimonial.imagePath));
  // }
  await deleteDoc(docRef);
};
