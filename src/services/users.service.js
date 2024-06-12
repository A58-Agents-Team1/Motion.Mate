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
  try {
    return get(ref(db, `users/${username}`));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUsers = async () => {
  try {
    const result = await get(ref(db, 'users'));
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllFriends = async (username) => {
  try {
    const friendsRef = ref(db, `users/${username}/friends`);
    const friendsSnapshot = await get(friendsRef);
    const friendsData = await friendsSnapshot.val();
    const friendsList = [];

    for (const friendUsername in friendsData) {
      const friendSnapshot = await getUserByUsername(friendUsername);
      friendsList.push(friendSnapshot.val());
    }

    return friendsList;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUsersDataRequests = async (username) => {
  try {
    const requestsRef = ref(db, `users/${username}/requests`);
    const requestsSnapshot = await get(requestsRef);
    const requestsData = await requestsSnapshot.val();
    const requestsList = [];

    for (const requestUsername in requestsData) {
      const requestSnapshot = await getUserByUsername(requestUsername);
      requestsList.push(requestSnapshot.val());
    }

    return requestsList;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getFilterUserBySearchTerm = async (searchBy, search) => {
  try {
    const snapshot = await get(ref(db, 'users'));
    const users = [];

    snapshot.forEach((acc) => {
      const user = acc.val();
      if (user[searchBy].toLowerCase().includes(search.toLowerCase())) {
        users.push(user);
      }
    });
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
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
  height,
  activityLevel,
  gender
) => {
  try {
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
      activityLevel,
      gender,
      previousScores: {
        previousCalories: 0,
        doneExercises: 0,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
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
  try {
    const updateData = {};
    updateData[`users/${username}/friends/${friendUsername}`] = true;
    updateData[`users/${friendUsername}/friends/${username}`] = true;
    updateData[`users/${username}/requests/${friendUsername}`] = null;
    updateData[`users/${username}/myRequests/${friendUsername}`] = null;
    updateData[`users/${friendUsername}/myRequests/${username}`] = null;
    update(ref(db), updateData);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeFriendRequestService = async (username, friendUsername) => {
  try {
    const updateData = {};
    updateData[`users/${username}/requests/${friendUsername}`] = null;
    updateData[`users/${friendUsername}/requests/${username}`] = null;
    updateData[`users/${username}/myRequests/${friendUsername}`] = null;
    updateData[`users/${friendUsername}/myRequests/${username}`] = null;

    update(ref(db), updateData);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendRequestService = async (username, friendUsername) => {
  try {
    const updateData = {};
    updateData[`users/${friendUsername}/requests/${username}`] = true;
    updateData[`users/${username}/myRequests/${friendUsername}`] = true;

    update(ref(db), updateData);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeFriendService = async (username, friendUsername) => {
  try {
    const updateData = {};
    updateData[`users/${username}/friends/${friendUsername}`] = null;
    updateData[`users/${friendUsername}/friends/${username}`] = null;
    updateData[`users/${username}/myRequests/${friendUsername}`] = null;
    updateData[`users/${friendUsername}/myRequests/${username}`] = null;

    update(ref(db), updateData);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkFriendStatusService = async (username, friendUsername) => {
  try {
    const friendsRef = ref(db, `users/${username}/friends/${friendUsername}`);

    const snapshot = await get(friendsRef);
    return snapshot.exists();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkFriendRequestService = async (username, friendUsername) => {
  try {
    const requestsRef = ref(db, `users/${friendUsername}/requests/${username}`);

    const snapshot = await get(requestsRef);
    return snapshot.exists();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addUserExercise = async (username, exerciseId) => {
  try {
    return await update(ref(db, `users/${username}`), {
      exercises: exerciseId,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserData = (uid) => {
  try {
    return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserByUsername = async (username, data) => {
  try {
    return await update(ref(db, `users/${username}`), data);
  } catch (error) {
    throw new Error(error.message);
  }
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
    throw new Error(e.message);
  }
};

export const getCategoryPhoto = async (category) => {
  try {
    const imageRef = refStorage(storage, `categories/${category}`);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (e) {
    throw new Error(e.message);
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
  try {
    const result = await get(ref(db, `users/${username}/avatar`));
    return result.val();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const startExercise = async (username, time, exerciseId, calories) => {
  try {
    await update(ref(db, `users/${username}`), {
      endCurrentExercise: {
        timeLeft: time,
        exerciseId,
        calories: Number(calories),
      },
    });
    const newScores = await get(ref(db, `users/${username}/previousScores`));
    const updatedCalories =
      Number(newScores.val().previousCalories) + Number(calories);

    await update(ref(db, `users/${username}/previousScores`), {
      previousCalories: updatedCalories,
      doneExercises: Number(newScores.val().doneExercises) + 1,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const endExercise = async (username) => {
  try {
    await update(ref(db, `users/${username}`), { endCurrentExercise: null });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const whenTimerEnds = async (username) => {
  try {
    const currentScores = await get(
      ref(db, `users/${username}/previousScores`)
    );
    await update(ref(db, `users/${username}/updatedScores`), {
      updatedCalories: currentScores.val().previousCalories,
      doneExercises: currentScores.val().doneExercises,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const StartTimerWorkout = async (username, timer) => {
  try {
    await update(ref(db, `users/${username}/workoutTimer`), {
      timer: timer,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const stopTimerRemoveCalories = async (username, calories) => {
  try {
    const currentScores = await get(
      ref(db, `users/${username}/previousScores`)
    );

    const previousCalories = Number(currentScores.val().previousCalories);
    const doneExercises = Number(currentScores.val().doneExercises);

    await update(ref(db, `users/${username}/previousScores`), {
      previousCalories: previousCalories - Number(calories),
      doneExercises: doneExercises - 1,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const stopTimerWorkout = async (username) => {
  try {
    await update(ref(db, `users/${username}`), { workoutTimer: null });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserScores = async (username) => {
  const scores = await get(ref(db, `users/${username}/updatedScores`));
  return scores.val();
};

export const resetUserScores = async (username) => {
  const resetPreviousScores = {
    doneExercises: 0,
    previousCalories: 0,
  };

  const resetUpdatedScores = {
    doneExercises: 0,
    updatedCalories: 0,
  };

  await set(ref(db, `users/${username}/previousScores`), resetPreviousScores);
  await set(ref(db, `users/${username}/updatedScores`), resetUpdatedScores);
};
