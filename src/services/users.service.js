import { db, storage } from '../config/firebase-config';
import {
  equalTo,
  get,
  orderByChild,
  query,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import {
  getDownloadURL,
  ref as refStorage,
  uploadBytes,
} from 'firebase/storage';

export const getUserByUsername = async (username) => {
  return get(ref(db, `users/${username}`));
};

export const getAllUsers = async () => {
  const result = await get(ref(db, 'users'));
  return result;
};

export const getAllFriends = async (username) => {
  const friendsRef = ref(db, `users/${username}/friends`);
  const friendsSnapshot = await get(friendsRef);
  const friendsData = await friendsSnapshot.val();
  const friendsList = [];

  for (const friendUsername in friendsData) {
    const friendSnapshot = await getUserByUsername(friendUsername);
    friendsList.push(friendSnapshot.val());
  }

  return friendsList;
};

export const getAllUsersDataRequests = async (username) => {
  const requestsRef = ref(db, `users/${username}/requests`);
  const requestsSnapshot = await get(requestsRef);
  const requestsData = await requestsSnapshot.val();
  const requestsList = [];

  for (const requestUsername in requestsData) {
    const requestSnapshot = await getUserByUsername(requestUsername);
    requestsList.push(requestSnapshot.val());
  }

  return requestsList;
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
  avatar,
  age,
  weight,
  height
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
    isBlocked: false,
    createdOn: new Date().valueOf(),
    exercises: [],
    age,
    weight,
    height,
  });
};

export const deleteUserAsync = async (username) => {
  try {
    const userRef = ref(db, `users/${username}`);
    await remove(userRef);
  } catch (error) {
    console.error('Error deleting user:', error.message);
  }
};

export const promoteToAdminAsync = async (username, role) => {
  try {
    await update(ref(db, `users/${username}`), { userRole: role });
  } catch (error) {
    console.log('Error promoting user to admin:', error.message);
  }
};

export const blockUserAsync = async (username, isBlocked) => {
  try {
    await update(ref(db, `users/${username}`), { isBlocked: isBlocked });
  } catch (error) {
    console.log('Error blocking user:', error.message);
  }
};

export const addFriendService = async (username, friendUsername) => {
  const updateData = {};
  updateData[`users/${username}/friends/${friendUsername}`] = true;
  updateData[`users/${friendUsername}/friends/${username}`] = true;
  updateData[`users/${username}/requests/${friendUsername}`] = null;
  updateData[`users/${username}/myRequests/${friendUsername}`] = null;
  updateData[`users/${friendUsername}/myRequests/${username}`] = null;
  update(ref(db), updateData);
};

export const removeFriendRequestService = async (username, friendUsername) => {
  const updateData = {};
  updateData[`users/${username}/requests/${friendUsername}`] = null;
  updateData[`users/${friendUsername}/requests/${username}`] = null;
  updateData[`users/${username}/myRequests/${friendUsername}`] = null;
  updateData[`users/${friendUsername}/myRequests/${username}`] = null;

  update(ref(db), updateData);
};

export const sendRequestService = async (username, friendUsername) => {
  const updateData = {};
  updateData[`users/${friendUsername}/requests/${username}`] = true;
  updateData[`users/${username}/myRequests/${friendUsername}`] = true;

  update(ref(db), updateData);
};

export const removeFriendService = async (username, friendUsername) => {
  const updateData = {};
  updateData[`users/${username}/friends/${friendUsername}`] = null;
  updateData[`users/${friendUsername}/friends/${username}`] = null;
  updateData[`users/${username}/myRequests/${friendUsername}`] = null;
  updateData[`users/${friendUsername}/myRequests/${username}`] = null;

  update(ref(db), updateData);
};

export const checkFriendStatusService = async (username, friendUsername) => {
  const friendsRef = ref(db, `users/${username}/friends/${friendUsername}`);

  const snapshot = await get(friendsRef);
  return snapshot.exists();
};

export const checkFriendRequestService = async (username, friendUsername) => {
  const requestsRef = ref(db, `users/${friendUsername}/requests/${username}`);

  const snapshot = await get(requestsRef);
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

export const uploadCategoryPhoto = async (image, category) => {
  try {
    const imageRef = refStorage(storage, `categories/${category}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

export const getCategoryPhoto = async (category) => {
  try {
    const imageRef = refStorage(storage, `categories/${category}`);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (e) {
    if (e.code === 'storage/object-not-found') {
      return null;
    } else {
      console.log(e.message);
      return null;
    }
  }
};

export const getFriends = async (username) => {
  try {
    const friendsRef = ref(db, `users/${username}/friends`);
    const friendsSnapshot = await get(friendsRef);
    const friendsData = friendsSnapshot.val();
    if (friendsData) {
      return Object.keys(friendsData);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserAvatar = async (username) => {
  const result = await get(ref(db, `users/${username}/avatar`));
  return result.val();
};
