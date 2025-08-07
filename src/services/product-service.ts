"use server";

import type { Product, CartItem } from "@/lib/types";
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
  runTransaction,
  setDoc,
} from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

type ProductFormData = Omit<Product, "id" | "popularity" | "reviews" | "imagePath" | "imageHint">;

// --- Firebase Implementation ---

export const getProducts = async (): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, "products");
    const snapshot = await getDocs(productsCollection);
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));

    if (products.length === 0) {
      console.log("No products found in Firebase. Creating a default product.");
      return [];
    }

    return products;
  } catch (error) {
    console.error("Failed to fetch products from Firebase, returning default product.", error);
    // This often happens during build time due to lack of Firebase permissions.
    // Returning a default product allows the build to succeed.
    return [];
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Product) : null;
};

export const addProduct = async (productData: ProductFormData): Promise<string> => {
  const newProductId = uuidv4();
  const docRef = doc(db, "products", newProductId);

  const newProduct: Product = {
    id: newProductId,
    ...productData,
    popularity: Math.floor(Math.random() * 50) / 10 + 1,
    reviews: [],
    imageHint: "paint can",
  };

  await setDoc(docRef, newProduct);

  return docRef.id;
};

export const updateProduct = async (productId: string, productData: Partial<ProductFormData>): Promise<void> => {
  const docRef = doc(db, "products", productId);
  const updateData: Partial<Product> = { ...productData };

  await updateDoc(docRef, updateData);
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const docRef = doc(db, "products", productId);
  // const productSnap = await getDoc(docRef);
  // if (!productSnap.exists()) {
  //     console.error(`Product with id ${productId} not found.`);
  //     return;
  // }
  // const product = productSnap.data() as Product;

  // if (product.imagePath && storage) {
  //     const imageRef = ref(storage, product.imagePath);
  //     await deleteObject(imageRef).catch(e => console.error("Failed to delete product image", e));
  // }
  await deleteDoc(docRef);
};

export const decrementStock = async (items: CartItem[]): Promise<void> => {
  await runTransaction(db, async (transaction) => {
    for (const item of items) {
      const productRef = doc(db, "products", item.productId);
      const productDoc = await transaction.get(productRef);

      if (!productDoc.exists()) {
        throw `Product ${item.productId} does not exist!`;
      }

      const productData = productDoc.data() as Product;
      const variantIndex = productData.variants.findIndex((v) => v.hex === item.variant.hex);

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
