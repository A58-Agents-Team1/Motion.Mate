import {
  AGE_MAX,
  AGE_MIN,
  HEIGHT_MAX,
  HEIGHT_MAX_IN,
  HEIGHT_MIN,
  HEIGHT_MIN_IN,
  WEIGHT_HEIGHT_MIN,
  WEIGHT_MAX,
  WEIGHT_MAX_LBS,
  WEIGHT_MIN,
  WEIGHT_MIN_LBS,
} from './constants';

export const validateFormInMetric = (form) => {
  if (form.weight === '' && form.height === '' && form.age === '') {
    throw new Error(
      'Please enter your weight, height and age to calculate your BMR and TDEE'
    );
  }
  if (
    form.weight < WEIGHT_HEIGHT_MIN ||
    form.height < WEIGHT_HEIGHT_MIN ||
    form.age < WEIGHT_HEIGHT_MIN
  ) {
    throw new Error(`There can be no negative fields.`);
  }
  if (form.weight > WEIGHT_MAX || form.weight < WEIGHT_MIN) {
    throw new Error(
      `Weight must be more than ${WEIGHT_MIN} kg and less than ${WEIGHT_MAX} kg`
    );
  }
  if (form.height > HEIGHT_MAX || form.height < HEIGHT_MIN) {
    throw new Error(
      `Height must be more than ${HEIGHT_MIN} cm and less than ${HEIGHT_MAX} cm`
    );
  }
  if (form.age > AGE_MAX || form.age < AGE_MIN) {
    throw new Error(
      `Age must be more than ${AGE_MIN} years and less than ${AGE_MAX} years`
    );
  }
};

export const validateFormInImperial = (form) => {
  if (form.weight === '' && form.height === '' && form.age === '') {
    throw new Error(
      'Please enter your weight, height and age to calculate your BMR and TDEE'
    );
  }
  if (
    form.weight < WEIGHT_HEIGHT_MIN ||
    form.height < WEIGHT_HEIGHT_MIN ||
    form.age < WEIGHT_HEIGHT_MIN
  ) {
    throw new Error(`There can be no negative fields.`);
  }
  if (form.weight > WEIGHT_MAX_LBS || form.weight < WEIGHT_MIN_LBS) {
    throw new Error(
      `Weight must be more than ${WEIGHT_MIN_LBS} lbs and less than ${WEIGHT_MAX_LBS} lbs`
    );
  }
  if (form.height > HEIGHT_MAX_IN || form.height < HEIGHT_MIN_IN) {
    throw new Error(
      `Height must be more than ${HEIGHT_MIN_IN} in and less than ${HEIGHT_MAX_IN} in`
    );
  }
  if (form.age > AGE_MAX || form.age < AGE_MIN) {
    throw new Error(
      `Age must be more than ${AGE_MIN} years and less than ${AGE_MAX} years`
    );
  }
};
