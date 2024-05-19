// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCUGX8ovmd13o8jlx5T_rIWmZ7LvMQp--E',
  authDomain: 'motion-mate.firebaseapp.com',
  projectId: 'motion-mate',
  storageBucket: 'motion-mate.appspot.com',
  messagingSenderId: '1002546205882',
  appId: '1:1002546205882:web:6f9fa11f7f0787c915de83',
  databaseURL:
    'https://motion-mate-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);

export const storage = getStorage(app);
