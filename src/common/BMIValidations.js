export const validateForm = (weight, height) => {
  if (weight === '' || height === '') {
    throw new Error(
      'Please enter your weight and height to calculate your BMI'
    );
  }
  if (weight < 0 || height < 0) {
    throw new Error('Weight and height must be greater than 0');
  }
  if (weight > 500 || weight < 20) {
    throw new Error('Weight must be more than 20 kg and less than 500 kg');
  }
  if (height > 300 || height < 50) {
    throw new Error('Height must be more than 50 sm and less than 300 sm');
  }
};
