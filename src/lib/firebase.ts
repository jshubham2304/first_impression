// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getRemoteConfig } from "firebase/remote-config";

// Your web app's Firebase configuration.
// For production, it's recommended to load these from environment variables.
const firebaseConfig = {
  apiKey: "AIzaSyA328cOcUnh1t_t4ebAgX34EpSQA_-t-jA",
  authDomain: "exampletest-be77e.firebaseapp.com",
  projectId: "exampletest-be77e",
  storageBucket: "exampletest-be77e.appspot.com",
  messagingSenderId: "388649945103",
  appId: "1:388649945103:web:f2a9a100801d4059047b7a"
};

// Warn if the config is using placeholder values.
if (firebaseConfig.projectId === "your-project-id") {
    console.warn('Firebase configuration is using placeholder values. Please copy .env.local.example to .env.local and add your project credentials for full functionality.');
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const remoteConfig = getRemoteConfig(app);

// It's good practice to set default values and fetch intervals for remote config
if (typeof window !== 'undefined') {
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour
    remoteConfig.defaultConfig = {
      'admin_pin': '230498' // Default PIN. For production, set this in the Firebase Remote Config console.
    };
}

export { app, db, storage, remoteConfig };
