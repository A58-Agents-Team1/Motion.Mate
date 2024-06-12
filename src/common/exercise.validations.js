import {
  EXERCISE_MAX_CONTENT_LENGTH,
  EXERCISE_MAX_TITLE_LENGTH,
  EXERCISE_MIN_CONTENT_LENGTH,
  EXERCISE_MIN_TITLE_LENGTH,
} from './constants';

export const validateExerciseForm = (
  title,
  content,
  hours,
  minutes,
  seconds,
  calories,
  level,
  category
) => {
  if (!title) {
    throw new Error('title is required');
  }
  if (title.length < EXERCISE_MIN_TITLE_LENGTH) {
    throw new Error('title is too short');
  }
  if (title.length > EXERCISE_MAX_TITLE_LENGTH) {
    throw new Error('title is too long');
  }
  if (content.length < EXERCISE_MIN_CONTENT_LENGTH) {
    throw new Error('content is too short');
  }
  if (content.length > EXERCISE_MAX_CONTENT_LENGTH) {
    throw new Error('content is too long');
  }
  if (hours < 0 || minutes < 0 || seconds < 0) {
    throw new Error('duration cannot be negative!');
  }
  if (!hours && !minutes && !seconds) {
    throw new Error('missing time duration for exercise');
  }
  if (!calories) {
    throw new Error('please add calories');
  }
  if (!level) {
    throw new Error('please select a level');
  }
  if (!category) {
    throw new Error('please select a category');
  }
};
