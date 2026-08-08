// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY6i5yXzg8fvP7eoDtqYRVpSTaxaY5d4g",
  authDomain: "color-palette-pro-pgw7a.firebaseapp.com",
  projectId: "color-palette-pro-pgw7a",
  storageBucket: "color-palette-pro-pgw7a.firebasestorage.app",
  messagingSenderId: "91372138472",
  appId: "1:91372138472:web:7d9e2ac0b520086fc4be5d",
};

// Initialize Firebase
let app: FirebaseApp;
let db: Firestore;
let storage: FirebaseStorage;

function initializeFirebase() {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    console.log("Firebase App initialized.");
  } else {
    app = getApp();
  }
  db = getFirestore(app);
  storage = getStorage(app);
  console.log("Firebase: Firestore and Storage initialized.");
  return { app, db, storage };
}

// Initialize and export
const firebaseServices = initializeFirebase();
app = firebaseServices.app;
db = firebaseServices.db;
storage = firebaseServices.storage;

export { app, db, storage };
