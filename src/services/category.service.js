import { get, push, ref } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getAllCategories = async () => {
  const snapshot = await get(ref(db, 'categories'));
  const data = snapshot.val();

  if (!snapshot.exists()) return [];

  const exercises = [];

  Object.keys(data).forEach((category) => {
    Object.keys(data[category]).forEach((categoryId) => {
      exercises.push({
        id: categoryId,
        category,
        ...data[category][categoryId],
      });
    });
  });

  return exercises;
};

export const createCategory = async (name, description, imageUrl) => {
  const category = {
    description,
    imageUrl,
  };
  const result = await push(ref(db, `categories/${name}`), category);
  return result.key;
};
