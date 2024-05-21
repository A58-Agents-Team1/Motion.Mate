import { get, push, ref, set } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createExercises = async (
  category,
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

  const result = await push(ref(db, `exercises/${category}`), exercise);
  return result.key;
};

export const getExercises = async () => {
  const snapshot = await get(ref(db, 'exercises'));
  const data = snapshot.val();

  if (!snapshot.exists()) return [];

  const exercises = [];

  Object.keys(data).forEach((category) => {
    Object.keys(data[category]).forEach((exerciseId) => {
      exercises.push({
        id: exerciseId,
        category,
        ...data[category][exerciseId],
      });
    });
  });

  return exercises;
};

export const getExercisesByUsername = async (username) => {
  const allExercises = await getExercises();
  const number = allExercises.filter(
    (exercise) => exercise.createdBy === username
  );
  return number;
};
