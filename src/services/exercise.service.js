import { get, push, ref } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createExercises = async (
  title,
  duration,
  description,
  level,
  createdBy,
  shortDescription
) => {
  const exercise = {
    title,
    duration,
    description,
    level,
    createdBy,
    shortDescription,
  };

  const result = await push(ref(db, 'exercises'), exercise);
  return result.key;
};

export const getExercises = async () => {
  const snapshot = await get(ref(db, 'exercises'));

  if (!snapshot.exists()) return [];

  return Object.entries(snapshot.val()).map(([key, value]) => {
    return {
      ...value,
      id: key,
    };
  });
};
