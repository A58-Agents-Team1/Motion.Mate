import {
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

export const validateFormInMetric = (weight, height) => {
  if (weight === '' || height === '') {
    throw new Error(
      'Please enter your weight and height to calculate your BMI'
    );
  }
  if (weight < WEIGHT_HEIGHT_MIN || height < WEIGHT_HEIGHT_MIN) {
    throw new Error(
      `Weight and height can't be less than ${WEIGHT_HEIGHT_MIN} kg and cm respectively`
    );
  }
  if (weight > WEIGHT_MAX || weight < WEIGHT_MIN) {
    throw new Error(
      `Weight must be more than ${WEIGHT_MIN} kg and less than ${WEIGHT_MAX} kg`
    );
  }
  if (height > HEIGHT_MAX || height < HEIGHT_MIN) {
    throw new Error(
      `Height must be more than ${HEIGHT_MIN} cm and less than ${HEIGHT_MAX} cm`
    );
  }
};

export const validateFormInImperial = (weight, height) => {
  if (weight === '' || height === '') {
    throw new Error(
      'Please enter your weight and height to calculate your BMI'
    );
  }
  if (weight < WEIGHT_HEIGHT_MIN || height < WEIGHT_HEIGHT_MIN) {
    throw new Error(
      `Weight and height can't be less than ${WEIGHT_HEIGHT_MIN} lbs and in respectively`
    );
  }
  if (weight > WEIGHT_MAX_LBS || weight < WEIGHT_MIN_LBS) {
    throw new Error(
      `Weight must be more than ${WEIGHT_MIN_LBS} lbs and less than ${WEIGHT_MAX_LBS} lbs`
    );
  }
  if (height > HEIGHT_MAX_IN || height < HEIGHT_MIN_IN) {
    throw new Error(
      `Height must be more than ${HEIGHT_MIN_IN}in and less than ${HEIGHT_MAX_IN}in`
    );
  }
};
