import { useContext, useEffect, useState } from 'react';
import {
  validateFormInImperial,
  validateFormInMetric,
} from '../../common/BMIValidations';
import { BMI_CONVERSION_FACTOR } from '../../common/constants';
import { alertHelper } from '../../helper/alert-helper';
import BMIInMetricSystem from './BMIInMetricSystem';
import BMIInImperialSystem from './BMIInImperialSystem';
import BMIClassificationTable from './BMIClassificationTable';
import AlertSuccess from '../Alerts/AlertSuccess';
import AlertError from '../Alerts/AlertError';
import { AppContext } from '../../context/AppContext';
import GetBMIDescription from './GetBMIDescription';

export default function BodyMassIndex() {
  const { userData } = useContext(AppContext);
  const [isChecked, setIsChecked] = useState(true);
  const [message, setMessage] = useState(null);
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [BMI, setBMI] = useState(0);
  const [userBMI, setUserBMI] = useState(0);
  const [form, setForm] = useState({
    weight: '',
    height: '',
  });

  useEffect(() => {
    if (userData?.weight && userData?.height) {
      const squaredHeight = (Math.pow(userData?.height, 2) / 10000).toFixed(2);
      const bmi = (userData?.weight / squaredHeight).toFixed(1);
      setUserBMI(bmi);
    }
  }, []);

  const handleChange = () => {
    setIsChecked(!isChecked);
    setForm({ weight: '', height: '' });
    setBMI(0);
  };

  const updateForm = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const calculate = () => {
    try {
      if (isChecked) {
        validateFormInMetric(form.weight, form.height);
        const squaredHeight = (Math.pow(form.height, 2) / 10000).toFixed(2);
        const bmi = (form.weight / squaredHeight).toFixed(1);
        setBMI(bmi);
      } else {
        validateFormInImperial(form.weight, form.height);
        const squaredHeight = Math.pow(form.height, 2).toFixed(2);
        const bmi = (
          (form.weight / squaredHeight) *
          BMI_CONVERSION_FACTOR
        ).toFixed(1);
        setBMI(bmi);
      }
      alertHelper(
        setMessage,
        setSuccess,
        'Body Mass Index calculated successfully!'
      );
    } catch (error) {
      alertHelper(setMessage, setAlert, error.message);
    }
  };

  return (
    <div className='card p-4 flex flex-col bg-base-100 text-center m-4 border-2 border-gray-500 rounded-2xl shadow-2xl'>
      <p className='font-bold text-xl text-primary mb-8'>
        BMI, or Body Mass Index, is a widely used tool to assess whether an
        individual has a healthy body weight for a given height.
      </p>
      <p>
        For more than 150 years, the Body Mass Index (BMI) tool has been used to
        estimate how much body fat someone has to understand whether they are a
        healthy weight for their height. While it is a quick, easy-to-use, and
        popular measure, it can also be misleading in certain cases and for some
        groups of people.
      </p>
      <div className='mt-8 flex flex-col border-2 border-gray-500 rounded-3xl p-4 bg-orange-300 text-black'>
        <p>Find your BMI and health risks: </p>
        {isChecked ? (
          <BMIInMetricSystem
            form={form}
            updateForm={updateForm}
          />
        ) : (
          <BMIInImperialSystem
            form={form}
            updateForm={updateForm}
          />
        )}
        <div className='flex mt-4 items-center justify-end'>
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
            className='border-2 border-gray-500 rounded-2xl p-2 bg-blue-200 text-black h-14 mx-4'
            onClick={() => calculate()}
          >
            Calculate
          </button>
        </div>
        <div className='mt-4'>{GetBMIDescription(BMI)}</div>
      </div>
      {userData?.weight && userData?.height ? (
        <div className='mt-2 flex flex-col border-2 border-gray-500 rounded-3xl p-4 bg-orange-300 text-black'>
          <p>
            Your BMI is automatically calculated based on the weight and height
            you provided in your profile.
            {GetBMIDescription(userBMI)}
          </p>
        </div>
      ) : (
        <div className='mt-2 flex flex-col border-2 border-gray-500 rounded-3xl p-4 bg-orange-300 text-black'>
          <p>
            To view your automatically calculated BMI, please update your
            profile with your weight and height.
          </p>
        </div>
      )}
      <BMIClassificationTable />
      <div className='mb-4'>
        <h1 className='text-primary font-bold'>
          Why is BMI important to know?
        </h1>
        <p>
          BMI is a good way to check your risk of diseases related to body fat.
          Living with overweight or obesity is associated with an increased risk
          of mortality and other diseases or conditions. Generally, the higher
          your BMI, the greater the risk of developing other chronic
          obesity-related diseases.
        </p>
      </div>
      {success && <AlertSuccess message={message} />}
      {alert && <AlertError message={message} />}
    </div>
  );
}
