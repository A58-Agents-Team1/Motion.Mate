import { db, storage } from '../config/firebase-config';
import {
  equalTo,
  get,
  orderByChild,
  query,
  ref,
  set,
  update,
} from 'firebase/database';
import {
  getDownloadURL,
  ref as refStorage,
  uploadBytes,
} from 'firebase/storage';

export const getUserByUsername = (username) => {
  return get(ref(db, `users/${username}`));
};

export const getAllUsers = async () => {
  const result = await get(ref(db, 'users'));
  return result;
};

export const createUser = (
  uid,
  username,
  email,
  phoneNumber,
  firstName,
  lastName,
  avatar
) => {
  return set(ref(db, `users/${username}`), {
    uid,
    username,
    email,
    phoneNumber,
    firstName,
    lastName,
    avatar,
    userRole: 'user',
    createdOn: new Date().valueOf(),
    exercises: [],
  });
};

export const addUserExercise = async (username, exerciseId) => {
  return await update(ref(db, `users/${username}`), {
    exercises: exerciseId,
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const uploadPhoto = async (image, imageName) => {
  try {
    const imageRef = refStorage(storage, `images/${imageName}`);
    return await uploadBytes(imageRef, image);
  } catch (e) {
    if (e) {
      console.log(e.message);
    }
  }
};

export const getUploadedPhoto = async (imageName) => {
  try {
    const imageRef = refStorage(storage, `images/${imageName}`);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (e) {
    if (e.message === 'storage/object-not-found') {
      return null;
    }
  }
};
