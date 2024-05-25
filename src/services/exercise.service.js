import { get, push, ref, remove } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createExercises = async (
  title,
  content,
  hours,
  minutes,
  seconds,
  calories,
  level,
  createdBy,
  categoryId
) => {
  const exercise = {
    title,
    content,
    duration: {
      hours,
      minutes,
      seconds,
    },
    calories,
    level,
    createdBy,
    categoryId,
    inProgress: false,
  };

  try {
    const result = await push(ref(db, `exercises/`), exercise);
    return result.key;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getExercises = async () => {
  const snapshot = await get(ref(db, `exercises`));
  return snapshot.val();
};

// ADD THROW ON EVERY FUNCTION
export const deleteExercise = async (exerciseId) => {
  try {
    const postRef = ref(db, `exercises/${exerciseId}`);
    await remove(postRef);
  } catch (error) {
    throw new Error(error.message);
  }
};
