import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getUserByUsername = (username) => {
  return get(ref(db, `users/${username}`));
};

export const createUser = (
  username,
  uid,
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
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};
