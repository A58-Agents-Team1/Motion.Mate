import { get, push, ref, remove, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createExercises = async (
  categoryName,
  title,
  content,
  hours,
  minutes,
  seconds,
  calories,
  level,
  createdBy
) => {
  const exercise = {
    categoryName,
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
    inProgress: false,
  };

  try {
    const result = await push(ref(db, `exercises/${categoryName}`), exercise);
    return result.key;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getExercises = async () => {
  try {
    const snapshot = await get(ref(db, `exercises`));
    return snapshot.val();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteExercise = async (exerciseId) => {
  try {
    const postRef = ref(db, `exercises/${exerciseId}`);
    await remove(postRef);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addExerciseInProgress = async (exerciseId) => {
  try {
    return await update(ref(db, `exercises/${exerciseId}`), {
      inProgress: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeExerciseInProgress = async (exerciseId) => {
  try {
    return await update(ref(db, `exercises/${exerciseId}`), {
      inProgress: false,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editExercise = async (exerciseId, data) => {
  try {
    return await update(ref(db, `exercises/${exerciseId}`), data);
  } catch (error) {
    throw new Error(error.message);
  }
};
