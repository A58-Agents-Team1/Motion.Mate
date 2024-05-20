import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebase-config.js';
import { getUserByUsername } from './users.service.js';

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const loginUserByUsername = async (username, password) => {
  try {
    const user = await getUserByUsername(username);
    if (!user.exists()) {
      throw new Error('No user found with this username');
    }
    const { email } = user.val();
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error.message);
  }
}

export const logoutUser = () => {
  return signOut(auth);
};
