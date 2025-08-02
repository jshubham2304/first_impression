'use server';

import type { ProductAttributes, SiteSettings } from '@/lib/types';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Default data to seed Firestore if it's empty
const defaultAttributes: ProductAttributes = {
    brands: ['Prestige Paints', 'GreenSheen', 'ProTect', 'Pure Hues', 'MetroPaints', 'GoldenRay'],
    finishes: ['Matte', 'Satin', 'Semi-Gloss', 'Gloss'],
    colorFamilies: ['Reds', 'Blues', 'Greens', 'Yellows', 'Neutrals', 'Whites'],
    categories: ['Interior', 'Exterior', 'Texture', 'Wood'],
};

const defaultSiteSettings: SiteSettings = {
    visibleLinks: ["Home", "Paints", "Services", "Visualizer", "Get Estimate"],
};


// --- Firebase Implementation ---

export const getProductAttributes = async (): Promise<ProductAttributes> => {
    const attributesDocRef = doc(db, 'configuration', 'productAttributes');
    const docSnap = await getDoc(attributesDocRef);
    if (docSnap.exists()) {
        return docSnap.data() as ProductAttributes;
    }
    // If it doesn't exist in Firestore, create it from default data
    console.log("No product attributes found in Firebase. Seeding with default data.");
    await setDoc(attributesDocRef, defaultAttributes);
    return defaultAttributes;
};

export const updateProductAttributes = async (attributes: Partial<ProductAttributes>): Promise<void> => {
    const attributesDocRef = doc(db, 'configuration', 'productAttributes');
    await setDoc(attributesDocRef, attributes, { merge: true });
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
    const siteSettingsDocRef = doc(db, 'configuration', 'siteSettings');
    const docSnap = await getDoc(siteSettingsDocRef);
    if (docSnap.exists()) {
        return docSnap.data() as SiteSettings;
    }
    console.log("No site settings found in Firebase. Seeding with default data.");
    await setDoc(siteSettingsDocRef, defaultSiteSettings);
    return defaultSiteSettings;
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<void> => {
    const siteSettingsDocRef = doc(db, 'configuration', 'siteSettings');
    await setDoc(siteSettingsDocRef, settings, { merge: true });
};
