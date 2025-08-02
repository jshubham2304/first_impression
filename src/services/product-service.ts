'use server';

import type { Product, CartItem } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, runTransaction, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

type ProductFormData = Omit<Product, 'id' | 'popularity' | 'reviews' | 'imageUrl' | 'imageHint' | 'imagePath'>;


// --- Firebase Implementation ---

export const getProducts = async (): Promise<Product[]> => {
    const productsCollection = collection(db, 'products');
    const snapshot = await getDocs(productsCollection);
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    
    // Create a default product if none exist
    if (products.length === 0) {
        console.log("No products found in Firebase. Creating a default product.");
        const defaultProduct: Product = {
            id: 'prod-1',
            name: 'Royal Touch Interior',
            brand: 'Prestige Paints',
            category: 'Interior',
            isActive: true,
            finish: 'Satin',
            colorFamily: 'Blues',
            price: 45.99,
            stock: 150,
            popularity: 4.8,
            description: 'A premium, washable satin finish paint that offers a smooth, luxurious feel. Perfect for high-traffic areas like living rooms and hallways.',
            imageUrl: 'https://images.unsplash.com/photo-1572204541188-a32f7a179b5c?q=80&w=1200&auto=format&fit=crop',
            imageHint: 'paint can',
            variants: [
                { name: 'Sky Blue', hex: '#87CEEB', stock: 50 },
                { name: 'Navy', hex: '#000080', stock: 40 },
                { name: 'Teal', hex: '#008080', stock: 60 },
            ],
            reviews: [
                { id: 'rev-1', author: 'Jane Doe', rating: 5, comment: 'Beautiful color and great coverage!', date: '2023-05-15' }
            ],
        };
        await setDoc(doc(db, 'products', defaultProduct.id), defaultProduct);
        return [defaultProduct];
    }
    
    return products;
};

export const getProduct = async (id: string): Promise<Product | null> => {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Product : null;
};

export const addProduct = async (productData: ProductFormData, imageFile: File): Promise<string> => {
    const newProductId = uuidv4();
    const imagePath = `products/${newProductId}/${imageFile.name}`;
    const storageRef = ref(storage, imagePath);
    
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);

    const docRef = doc(db, 'products', newProductId);

    const newProduct: Product = {
        id: newProductId,
        ...productData,
        popularity: Math.floor(Math.random() * 50) / 10 + 1,
        reviews: [],
        imageUrl,
        imagePath,
        imageHint: 'paint can',
    };
    
    await setDoc(docRef, newProduct);
    
    return docRef.id;
};


export const updateProduct = async (productId: string, productData: Partial<ProductFormData>, imageFile?: File): Promise<void> => {
    const docRef = doc(db, 'products', productId);
    const updateData: Partial<Product> = { ...productData };

    if (imageFile) {
        const productSnap = await getDoc(docRef);
        const existingProduct = productSnap.data() as Product;
        if (existingProduct.imagePath && storage) {
            const oldImageRef = ref(storage, existingProduct.imagePath);
            await deleteObject(oldImageRef).catch(e => console.error("Could not delete old image", e));
        }

        const imagePath = `products/${productId}/${imageFile.name}`;
        const storageRef = ref(storage, imagePath);
        await uploadBytes(storageRef, imageFile);
        updateData.imageUrl = await getDownloadURL(storageRef);
        updateData.imagePath = imagePath;
    }
    
    await updateDoc(docRef, updateData);
};

export const deleteProduct = async (productId: string): Promise<void> => {
    const docRef = doc(db, 'products', productId);
    const productSnap = await getDoc(docRef);
    if (!productSnap.exists()) {
        console.error(`Product with id ${productId} not found.`);
        return;
    }
    const product = productSnap.data() as Product;
    
    if (product.imagePath && storage) {
        const imageRef = ref(storage, product.imagePath);
        await deleteObject(imageRef).catch(e => console.error("Failed to delete product image", e));
    }
    await deleteDoc(docRef);
};

export const decrementStock = async (items: CartItem[]): Promise<void> => {
     await runTransaction(db, async (transaction) => {
        for (const item of items) {
            const productRef = doc(db, 'products', item.productId);
            const productDoc = await transaction.get(productRef);

            if (!productDoc.exists()) {
                throw `Product ${item.productId} does not exist!`;
            }

            const productData = productDoc.data() as Product;
            const variantIndex = productData.variants.findIndex(v => v.hex === item.variant.hex);

            if (variantIndex > -1) {
                const currentStock = productData.variants[variantIndex].stock;
                if (currentStock < item.quantity) {
                    throw `Not enough stock for ${productData.name} - ${item.variant.name}. Requested: ${item.quantity}, Available: ${currentStock}`;
                }
                productData.variants[variantIndex].stock -= item.quantity;
                productData.stock = productData.variants.reduce((sum, v) => sum + v.stock, 0);
                transaction.update(productRef, { variants: productData.variants, stock: productData.stock });
            }
        }
    });
};
