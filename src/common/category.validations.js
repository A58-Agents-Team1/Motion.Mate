import {
  CATEGORY_MAX_DESCRIPTION_LENGTH,
  CATEGORY_MAX_TITLE_LENGTH,
  CATEGORY_MIN_DESCRIPTION_LENGTH,
  CATEGORY_MIN_TITLE_LENGTH,
} from './constants';

export const validateCategoryForm = (name, description, url) => {
  if (
    name.length < CATEGORY_MIN_TITLE_LENGTH ||
    name.length > CATEGORY_MAX_TITLE_LENGTH
  ) {
    throw new Error('Title must be between 5 and 20 characters');
  }
  if (
    description.length < CATEGORY_MIN_DESCRIPTION_LENGTH ||
    description.length > CATEGORY_MAX_DESCRIPTION_LENGTH
  ) {
    throw new Error('description must be between 1 and 40 characters');
  }
  if (!url) {
    throw new Error('please upload a photo');
  }
};
