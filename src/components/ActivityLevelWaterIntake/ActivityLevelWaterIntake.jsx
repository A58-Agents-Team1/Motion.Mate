import { useState } from 'react';
import AlertSuccess from '../Alerts/AlertSuccess';
import AlertError from '../Alerts/AlertError';
import { alertHelper } from '../../helper/alert-helper';
import {
  validateFormInImperial,
  validateFormInMetric,
} from '../../common/ALWIValidations';
import MetricWaterIntake from './MetricWaterIntake';
import ImperialWaterIntake from './ImperialWaterIntake';
import {
  ACTIVITY_MULTIPLIERS,
  KG_TO_LBS_CONVERSION_FACTOR,
  WATER_INTAKE_CONSTANT,
} from '../../common/constants';

export default function ActivityLevelWaterIntake() {
  const [alert, setAlert] = useState(false);
  const [weight, setWeight] = useState('');
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [waterIntake, setWaterIntake] = useState(0);
  const [activityLevel, setActivityLevel] = useState('sedentary');

  const handleChange = () => {
    setIsChecked(!isChecked);
    setWaterIntake(0);
    setWeight('');
  };

  const calculateWaterIntake = (weight, activityLevel) => {
    let activityMultiplier;

    switch (activityLevel) {
      case 'lightly_active':
        activityMultiplier = ACTIVITY_MULTIPLIERS.lightly_active;
        break;
      case 'moderately_active':
        activityMultiplier = ACTIVITY_MULTIPLIERS.moderately_active;
        break;
      case 'very_active':
        activityMultiplier = ACTIVITY_MULTIPLIERS.very_active;
        break;
      default:
        activityMultiplier = ACTIVITY_MULTIPLIERS.default;
    }

    return weight * activityMultiplier;
  };

  const calculate = () => {
    try {
      if (isChecked) {
        validateFormInMetric(weight);
        const intake = calculateWaterIntake(weight, activityLevel);
        setWaterIntake((intake * WATER_INTAKE_CONSTANT).toFixed(2));
      } else {
        validateFormInImperial(weight);
        const weightInKg = weight / KG_TO_LBS_CONVERSION_FACTOR;
        const intake = calculateWaterIntake(weightInKg, activityLevel);
        setWaterIntake((intake * WATER_INTAKE_CONSTANT).toFixed(2));
      }
      alertHelper(
        setMessage,
        setSuccess,
        'Activity Level Water Intake calculated successfully!'
      );
    } catch (error) {
      alertHelper(setMessage, setAlert, error.message);
    }
  };

  return (
    <>
      <div className='card p-4 flex flex-col bg-base-100 text-center m-4 border-2 border-gray-500 rounded-2xl shadow-2xl'>
        <p className='font-bold text-xl mb-8'>
          Understanding how much water you need to drink daily is essential for
          maintaining good health, and your activity level plays a significant
          role in determining this amount.
        </p>
        <p>
          For more than a century, hydration guidelines have emphasized the
          importance of adjusting water intake based on physical activity.
          Different activity levels require different amounts of water to keep
          the body properly hydrated. A sedentary individual needs less water
          compared to someone who is very active.
        </p>
        <div className='mt-8 flex flex-col border-2 border-gray-500 rounded-3xl p-4 bg-orange-200 text-black'>
          <p>Water Intake Calculator: </p>

          <div>
            <div>
              {isChecked ? (
                <MetricWaterIntake weight={weight} setWeight={setWeight} />
              ) : (
                <ImperialWaterIntake weight={weight} setWeight={setWeight} />
              )}
              <label>Activity Level:</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className='border-2 border-gray-500 rounded p-2 ml-1 bg-gray-200 shadow-xl text-black w-28'
              >
                <option value='sedentary'>Sedentary</option>
                <option value='lightly_active'>Lightly Active</option>
                <option value='moderately_active'>Moderately Active</option>
                <option value='very_active'>Very Active</option>
              </select>
            </div>
            <div className='flex my-4 items-center justify-end'>
              <div className='form-control flex flex-row items-center border-2 border-gray-500 rounded-2xl p-2 bg-blue-200 text-black h-14'>
                <p>Imperial or Metric System</p>
                <label className='cursor-pointer label'>
                  <input
                    type='checkbox'
                    className='toggle toggle-info'
                    checked={isChecked}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <button
                className='border-2 border-gray-500 rounded-2xl p-2 bg-blue-200 text-black h-14 ml-4'
                onClick={() => calculate()}
              >
                Calculate
              </button>
            </div>
            {waterIntake === 0 ? (
              <h2>
                Enter your weight and choose your activity level to calculate
                your daily water intake.
              </h2>
            ) : isChecked ? (
              <h2>Recommended Water Intake: {waterIntake} liters per day</h2>
            ) : (
              <h2>Recommended Water Intake: {waterIntake} ounces per day</h2>
            )}
          </div>
        </div>
        <div className='mb-4 mt-6'>
          <h1>Why is Proper Hydration Important?</h1>
          <p>
            Proper hydration is crucial for maintaining overall health and
            well-being. Water is essential for various bodily functions,
            including regulating body temperature, transporting nutrients, and
            removing waste. Staying well-hydrated can enhance physical
            performance, improve mood and concentration, and prevent
            complications such as kidney stones and urinary tract infections.
          </p>
        </div>
        {success && <AlertSuccess message={message} />}
        {alert && <AlertError message={message} />}
      </div>
    </>
  );
}