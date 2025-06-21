import { db, storage } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import type { Product } from '@/lib/types';

const PRODUCTS_COLLECTION = 'products';

// Function to fetch all products
export async function getProducts(): Promise<Product[]> {
    const productsCollection = collection(db, PRODUCTS_COLLECTION);
    const q = query(productsCollection, orderBy('name', 'asc'));
    const productSnapshot = await getDocs(q);
    const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as Product[];
    return productList;
}

// Function to fetch a single product by ID
export async function getProduct(id: string): Promise<Product | null> {
    const productDocRef = doc(db, PRODUCTS_COLLECTION, id);
    const productSnapshot = await getDoc(productDocRef);
    if (productSnapshot.exists()) {
        return { id: productSnapshot.id, ...productSnapshot.data() } as Product;
    } else {
        return null;
    }
}

// Function to upload an image and return its URL and path
async function uploadImage(imageFile: File, productId: string): Promise<{ imageUrl: string, imagePath: string }> {
    const imagePath = `products/${productId}/${imageFile.name}`;
    const storageRef = ref(storage, imagePath);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);
    return { imageUrl, imagePath };
}

// Function to add a new product
export async function addProduct(productData: Pick<Product, 'name' | 'brand' | 'price' | 'description' | 'finish' | 'colorFamily'>, imageFile: File) {
    const fullProductData = {
        ...productData,
        popularity: 0,
        reviews: [],
        variants: [{ name: 'Default', hex: '#FFFFFF' }],
        imageHint: 'paint can',
        imageUrl: '',
        imagePath: '',
    };
    
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {});
    const { imageUrl, imagePath } = await uploadImage(imageFile, docRef.id);
    
    fullProductData.imageUrl = imageUrl;
    fullProductData.imagePath = imagePath;

    await updateDoc(docRef, fullProductData);
    return docRef.id;
}


// Function to update an existing product
export async function updateProduct(productId: string, productData: Partial<Omit<Product, 'id'>>, imageFile?: File) {
    const productDocRef = doc(db, PRODUCTS_COLLECTION, productId);
    const updateData: Partial<Product> = { ...productData };

    if (imageFile) {
        // Delete old image if it exists
        const existingProduct = await getProduct(productId);
        if (existingProduct?.imagePath) {
            const oldImageRef = ref(storage, existingProduct.imagePath);
            try {
                await deleteObject(oldImageRef);
            } catch (error: any) {
                // It's okay if the old file doesn't exist.
                if (error.code !== 'storage/object-not-found') {
                    console.error("Could not delete old image:", error);
                }
            }
        }

        // Upload new image
        const { imageUrl, imagePath } = await uploadImage(imageFile, productId);
        updateData.imageUrl = imageUrl;
        updateData.imagePath = imagePath;
    }

    await updateDoc(productDocRef, updateData);
}


// Function to delete a product
export async function deleteProduct(productId: string) {
    const productDocRef = doc(db, PRODUCTS_COLLECTION, productId);

    // Delete image from storage first
    try {
        const product = await getProduct(productId);
        if (product?.imagePath) {
            const imageRef = ref(storage, product.imagePath);
            await deleteObject(imageRef);
        }
    } catch (error) {
        console.error("Error deleting product image, continuing to delete document:", error);
    }
    
    await deleteDoc(productDocRef);
}
