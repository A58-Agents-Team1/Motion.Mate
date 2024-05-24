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

export const getFilterUserBySearchTerm = async (searchBy, search) => {
  const snapshot = await get(ref(db, 'users'));
  const users = [];
  snapshot.forEach((acc) => {
    const user = acc.val();
    if (user[searchBy].toLowerCase().includes(search.toLowerCase())) {
      users.push(user);
    }
  });
  return users;
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

export const addFriendService = async (username, friendUsername) => {
  const updateData = {};
  updateData[`users/${username}/friends/${friendUsername}`] = true;

  update(ref(db), updateData);
};

export const removeFriendService = async (username, friendUsername) => {
  const updateData = {};
  updateData[`users/${username}/friends/${friendUsername}`] = null;

  update(ref(db), updateData);
};

export const checkFriendStatusService = async (username, friendUsername) => {
  const friendsRef = ref(db, `users/${username}/friends/${friendUsername}`);

  const snapshot = await get(friendsRef);
  return snapshot.exists();
};

export const addUserExercise = async (username, exerciseId) => {
  return await update(ref(db, `users/${username}`), {
    exercises: exerciseId,
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const updateUserByUsername = async (username, data) => {
  return await update(ref(db, `users/${username}`), data);
};

export const uploadPhoto = async (image, username) => {
  try {
    const imageRef = refStorage(storage, `images/${username}`);
    const url = await getUploadedPhoto(username);
    updateUserByUsername(username, { avatar: url });
    return await uploadBytes(imageRef, image);
  } catch (e) {
    if (e) {
      console.log(e.message);
    }
  }
};

export const getUploadedPhoto = async (username) => {
  try {
    const imageRef = refStorage(storage, `images/${username}`);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (e) {
    if (e.message === 'storage/object-not-found') {
      return null;
    }
  }
};
