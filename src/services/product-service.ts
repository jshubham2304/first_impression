
import { db, storage } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc, query, orderBy, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import type { Product, CartItem } from '@/lib/types';

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

// Type for data coming from the form, before we add server-generated fields.
type ProductFormData = Omit<Product, 'id' | 'popularity' | 'reviews' | 'imageUrl' | 'imagePath' | 'imageHint'>;

// Function to add a new product
export async function addProduct(productData: ProductFormData, imageFile: File): Promise<string> {
    // 1. Create a new document reference in the 'products' collection to get a unique ID.
    const newDocRef = doc(collection(db, PRODUCTS_COLLECTION));
    const newProductId = newDocRef.id;

    // 2. Upload the image using the new product ID.
    const { imageUrl, imagePath } = await uploadImage(imageFile, newProductId);

    // 3. Assemble the complete product object with all data.
    const productToSave: Omit<Product, 'id'> = {
        ...productData,
        imageUrl,
        imagePath,
        popularity: Math.floor(Math.random() * 50) + 1, // Add server-side data
        reviews: [],
        imageHint: 'paint can', // Add a default hint
    };

    // 4. Use setDoc to create the document with the full data object.
    await setDoc(newDocRef, productToSave);

    return newProductId;
}


// Function to update an existing product
export async function updateProduct(productId: string, productData: Partial<Omit<Product, 'id'>>, imageFile?: File) {
    const productDocRef = doc(db, PRODUCTS_COLLECTION, productId);
    const updateData: { [key: string]: any } = { ...productData };

    if (imageFile) {
        const existingProduct = await getProduct(productId);
        if (existingProduct?.imagePath) {
            const oldImageRef = ref(storage, existingProduct.imagePath);
            try {
                await deleteObject(oldImageRef);
            } catch (error: any) {
                if (error.code !== 'storage/object-not-found') {
                    console.error("Could not delete old image:", error);
                }
            }
        }

        const { imageUrl, imagePath } = await uploadImage(imageFile, productId);
        updateData.imageUrl = imageUrl;
        updateData.imagePath = imagePath;
    }

    await updateDoc(productDocRef, updateData);
}


// Function to delete a product
export async function deleteProduct(productId: string) {
    const productDocRef = doc(db, PRODUCTS_COLLECTION, productId);

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

// Function to decrement stock for items after an order is placed
export async function decrementStock(items: CartItem[]) {
    const productsToUpdate: Map<string, Product> = new Map();

    for (const item of items) {
        if (!productsToUpdate.has(item.productId)) {
            const product = await getProduct(item.productId);
            if (product) {
                productsToUpdate.set(item.productId, product);
            }
        }
    }

    for (const item of items) {
        const product = productsToUpdate.get(item.productId);
        if (product) {
            const variantIndex = product.variants.findIndex(v => v.hex === item.variant.hex);
            if (variantIndex > -1) {
                product.variants[variantIndex].stock = Math.max(0, product.variants[variantIndex].stock - item.quantity);
            }
        }
    }

    for (const [productId, product] of productsToUpdate.entries()) {
        const newTotalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
        await updateDoc(doc(db, PRODUCTS_COLLECTION, productId), {
            variants: product.variants,
            stock: newTotalStock,
        });
    }
}
