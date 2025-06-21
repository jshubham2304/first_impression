import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { ProductAttributes, SiteSettings } from '@/lib/types';

const CONFIG_COLLECTION = 'configuration';
const ATTRIBUTES_DOC = 'productAttributes';
const SETTINGS_DOC = 'siteSettings';

const defaultAttributes: ProductAttributes = {
    brands: ['Prestige Paints', 'GreenSheen', 'ProTect', 'Pure Hues', 'MetroPaints', 'GoldenRay'],
    finishes: ['Matte', 'Satin', 'Semi-Gloss', 'Gloss'],
    colorFamilies: ['Reds', 'Blues', 'Greens', 'Yellows', 'Neutrals', 'Whites'],
    categories: ['Interior', 'Exterior', 'Texture', 'Wood'],
};

export async function getProductAttributes(): Promise<ProductAttributes> {
    const docRef = doc(db, CONFIG_COLLECTION, ATTRIBUTES_DOC);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        // Ensure all properties exist, falling back to defaults if necessary
        return {
            brands: data.brands || defaultAttributes.brands,
            finishes: data.finishes || defaultAttributes.finishes,
            colorFamilies: data.colorFamilies || defaultAttributes.colorFamilies,
            categories: data.categories || defaultAttributes.categories,
        };
    } else {
        await setDoc(docRef, defaultAttributes);
        return defaultAttributes;
    }
}

export async function updateProductAttributes(attributes: Partial<ProductAttributes>): Promise<void> {
    const docRef = doc(db, CONFIG_COLLECTION, ATTRIBUTES_DOC);
    await setDoc(docRef, attributes, { merge: true });
}

const defaultSiteSettings: SiteSettings = {
    visibleLinks: ["Home", "Paints", "Services", "Visualizer", "Get Estimate"],
};

export async function getSiteSettings(): Promise<SiteSettings> {
    const docRef = doc(db, CONFIG_COLLECTION, SETTINGS_DOC);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            visibleLinks: data.visibleLinks || defaultSiteSettings.visibleLinks,
        };
    } else {
        await setDoc(docRef, defaultSiteSettings);
        return defaultSiteSettings;
    }
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<void> {
    const docRef = doc(db, CONFIG_COLLECTION, SETTINGS_DOC);
    await setDoc(docRef, settings, { merge: true });
}
