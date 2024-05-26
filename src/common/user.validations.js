import { getAllUsers, getUserByUsername } from '../services/users.service';
import {
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  PHONE_NUMBER_LENGTH,
} from './constants';

export const validateRequiredFieldsReg = (form) => {
  if (
    form.userName === '' ||
    form.email === '' ||
    form.password === '' ||
    form.phoneNumber === ''
  ) {
    throw new Error('Please fill in the required fields.');
  }
};

export const validateUserNameRegAsync = async (username) => {
  if (
    username.length < MIN_USERNAME_LENGTH ||
    username.length > MAX_USERNAME_LENGTH
  ) {
    throw new Error(
      `User Name name must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters long!`
    );
  }
  const userObject = await getUserByUsername(username);
  const userData = userObject.val();
  if (userData?.username) {
    throw new Error('User with this username already exists!');
  }
};

export const validateEmailRegAsync = async (email) => {
  if (!email.includes('@') || !email.includes('.')) {
    throw new Error('Please enter a valid email address.');
  }
  const snapshot = await getAllUsers();
  const allUsers = Object.values(snapshot.val());
  const userEmail = allUsers.find((user) => user.email === email);
  if (userEmail) {
    throw new Error('User with this email already exists!');
  }
};

export const validatePhoneNumberAsync = async (phoneNumber) => {
  if (phoneNumber.length !== PHONE_NUMBER_LENGTH) {
    throw new Error(`Phone number must be ${PHONE_NUMBER_LENGTH} digits long!`);
  }
  const snapshot = await getAllUsers();
  const allUsers = Object.values(snapshot.val());
  const userPhoneNumber = allUsers.find(
    (user) => user.phoneNumber === phoneNumber
  );
  if (userPhoneNumber) {
    throw new Error('User with this phone number already exists!');
  }
};

export const validatePassword = (password) => {
  if (
    password.length < MIN_PASSWORD_LENGTH ||
    password.length > MAX_PASSWORD_LENGTH
  ) {
    throw new Error(
      `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters long!`
    );
  }
};

export const validatePhoto = (photo) => {
  if (!photo) {
    throw new Error('Please upload a photo.');
  }
};

export const validateRequiredFieldsLogUsername = (form) => {
  if (form.username === '' || form.password === '') {
    throw new Error('Please fill in all fields.');
  }
};

export const validateUserNameLogAsync = async (username) => {
  if (
    username.length < MIN_USERNAME_LENGTH ||
    username.length > MAX_USERNAME_LENGTH
  ) {
    throw new Error(
      `User Name name must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters long!`
    );
  }
  const userObject = await getUserByUsername(username);
  const userData = userObject.val();
  if (!userData?.username) {
    throw new Error('User with this username does not exist!');
  }
};

export const validateRequiredFieldsLogEmail = (form) => {
  if (form.email === '' || form.password === '') {
    throw new Error('Please fill in all fields.');
  }
};

export const validateEmailLogAsync = async (email) => {
  if (!email.includes('@') || !email.includes('.')) {
    throw new Error('Please enter a valid email address.');
  }
  const snapshot = await getAllUsers();
  const allUsers = Object.values(snapshot.val());
  const userEmail = allUsers.find((user) => user.email === email);
  if (!userEmail) {
    throw new Error('User with this email does not exist!');
  }
};
