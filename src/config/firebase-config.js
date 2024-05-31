// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import.meta.env.REACT_APP_FIREBASE_API_KEY;
import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
import.meta.env.REACT_APP_FIREBASE_APP_ID;
import.meta.env.REACT_APP_FIREBASE_DATABASE_URL;

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY}`,
  authDomain: 'motion-mate.firebaseapp.com',
  projectId: 'motion-mate',
  storageBucket: 'motion-mate.appspot.com',
  messagingSenderId: `${import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID}`,
  databaseURL: `${import.meta.env.VITE_REACT_APP_FIREBASE_DATABASE_URL}`,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);

export const storage = getStorage(app);
