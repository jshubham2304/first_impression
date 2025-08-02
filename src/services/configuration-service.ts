'use server';

import type { ProductAttributes, SiteSettings } from '@/lib/types';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

if (USE_FIREBASE) {
    console.log('Configuration Service: Using Firebase');
} else {
    console.log('Configuration Service: Using Mock Data');
}

// --- Mock Data ---
let mockAttributes: ProductAttributes = {
    brands: ['Prestige Paints', 'GreenSheen', 'ProTect', 'Pure Hues', 'MetroPaints', 'GoldenRay'],
    finishes: ['Matte', 'Satin', 'Semi-Gloss', 'Gloss'],
    colorFamilies: ['Reds', 'Blues', 'Greens', 'Yellows', 'Neutrals', 'Whites'],
    categories: ['Interior', 'Exterior', 'Texture', 'Wood'],
};

let mockSiteSettings: SiteSettings = {
    visibleLinks: ["Home", "Paints", "Services", "Visualizer", "Get Estimate"],
};


// --- Firebase Implementation ---

const getProductAttributesFirebase = async (): Promise<ProductAttributes> => {
    const attributesDocRef = doc(db, 'configuration', 'productAttributes');
    const docSnap = await getDoc(attributesDocRef);
    if (docSnap.exists()) {
        return docSnap.data() as ProductAttributes;
    }
    // If it doesn't exist in Firestore, create it from mock data
    await setDoc(attributesDocRef, mockAttributes);
    return mockAttributes;
};

const updateProductAttributesFirebase = async (attributes: Partial<ProductAttributes>): Promise<void> => {
    const attributesDocRef = doc(db, 'configuration', 'productAttributes');
    await setDoc(attributesDocRef, attributes, { merge: true });
};

const getSiteSettingsFirebase = async (): Promise<SiteSettings> => {
    const siteSettingsDocRef = doc(db, 'configuration', 'siteSettings');
    const docSnap = await getDoc(siteSettingsDocRef);
    if (docSnap.exists()) {
        return docSnap.data() as SiteSettings;
    }
    await setDoc(siteSettingsDocRef, mockSiteSettings);
    return mockSiteSettings;
};

const updateSiteSettingsFirebase = async (settings: Partial<SiteSettings>): Promise<void> => {
    const siteSettingsDocRef = doc(db, 'configuration', 'siteSettings');
    await setDoc(siteSettingsDocRef, settings, { merge: true });
};


// --- Mock Implementation ---

const getProductAttributesMock = async (): Promise<ProductAttributes> => {
    return Promise.resolve(mockAttributes);
};

const updateProductAttributesMock = async (attributes: Partial<ProductAttributes>): Promise<void> => {
    mockAttributes = { ...mockAttributes, ...attributes };
    return Promise.resolve();
};

const getSiteSettingsMock = async (): Promise<SiteSettings> => {
    return Promise.resolve(mockSiteSettings);
};

const updateSiteSettingsMock = async (settings: Partial<SiteSettings>): Promise<void> => {
    mockSiteSettings = { ...mockSiteSettings, ...settings };
    return Promise.resolve();
};


// --- Exports ---

export const getProductAttributes = USE_FIREBASE ? getProductAttributesFirebase : getProductAttributesMock;
export const updateProductAttributes = USE_FIREBASE ? updateProductAttributesFirebase : updateProductAttributesMock;
export const getSiteSettings = USE_FIREBASE ? getSiteSettingsFirebase : getSiteSettingsMock;
export const updateSiteSettings = USE_FIREBASE ? updateSiteSettingsFirebase : updateSiteSettingsMock;
