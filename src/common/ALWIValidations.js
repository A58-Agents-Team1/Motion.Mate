import {
  WEIGHT_HEIGHT_MIN,
  WEIGHT_MAX,
  WEIGHT_MAX_LBS,
  WEIGHT_MIN,
  WEIGHT_MIN_LBS,
} from './constants';

export const validateFormInMetric = (weight) => {
  if (weight === '') {
    throw new Error(
      'Please enter your weight to calculate Activity Level Water Intake'
    );
  }
  if (weight < WEIGHT_HEIGHT_MIN) {
    throw new Error(`Weight can't be less than ${WEIGHT_HEIGHT_MIN} kg`);
  }
  if (weight > WEIGHT_MAX || weight < WEIGHT_MIN) {
    throw new Error(
      `Weight must be more than ${WEIGHT_MIN} kg and less than ${WEIGHT_MAX} kg`
    );
  }
};

export const validateFormInImperial = (weight) => {
  if (weight === '') {
    throw new Error(
      'Please enter your weight to calculate Activity Level Water Intake'
    );
  }
  if (weight < WEIGHT_HEIGHT_MIN) {
    throw new Error(`Weight can't be less than ${WEIGHT_HEIGHT_MIN} lbs`);
  }
  if (weight > WEIGHT_MAX_LBS || weight < WEIGHT_MIN_LBS) {
    throw new Error(
      `Weight must be more than ${WEIGHT_MIN_LBS} lbs and less than ${WEIGHT_MAX_LBS} lbs`
    );
  }
};
