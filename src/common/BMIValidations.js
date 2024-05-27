import {
  HEIGHT_MAX,
  HEIGHT_MIN,
  WEIGHT_HEIGHT_MIN,
  WEIGHT_MAX,
  WEIGHT_MIN,
} from './constants';

export const validateForm = (weight, height) => {
  if (weight === '' || height === '') {
    throw new Error(
      'Please enter your weight and height to calculate your BMI'
    );
  }
  if (weight < WEIGHT_HEIGHT_MIN || height < WEIGHT_HEIGHT_MIN) {
    throw new Error(
      `Weight and height must be greater than ${WEIGHT_HEIGHT_MIN} kg and sm respectively`
    );
  }
  if (weight > WEIGHT_MAX || weight < WEIGHT_MIN) {
    throw new Error(
      `Weight must be more than ${WEIGHT_MIN} kg and less than ${WEIGHT_MAX} kg`
    );
  }
  if (height > HEIGHT_MAX || height < HEIGHT_MIN) {
    throw new Error(
      `Height must be more than ${HEIGHT_MIN} sm and less than ${HEIGHT_MAX} sm`
    );
  }
};
