import { useState } from 'react';
import BMIClassificationTable from '../components/BMIClassificationTable';
import { validateForm } from '../common/BMIValidations';

export default function BodyMassIndex() {
  const [BMI, setBMI] = useState(0);
  const [form, setForm] = useState({
    weight: '',
    height: '',
  });

  const updateForm = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const calculate = () => {
    try {
      validateForm(form.weight, form.height);
      const squaredHeight = (Math.pow(form.height, 2) / 10000).toFixed(2);
      const bmi = (form.weight / squaredHeight).toFixed(1);
      setBMI(bmi);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='flex flex-col text-center'>
      <p className='font-bold text-xl mb-8'>
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
      <div className='mt-8 flex flex-col border-2 border-gray-400 rounded-3xl p-4 bg-orange-200 text-black'>
        <p>Find your BMI and health risks</p>
        <div className='mt-2'>
          <label htmlFor='weight'>Weight: </label>
          <input
            type='number'
            name='weight'
            placeholder='Weight in kg'
            value={form?.weight}
            onChange={updateForm('weight')}
            className='border-2 border-gray-500 rounded p-2 mr-6 bg-gray-200 shadow-xl text-black'
          />
          <label htmlFor='height'>Height: </label>
          <input
            type='number'
            name='height'
            placeholder='Height in sm'
            value={form?.height}
            onChange={updateForm('height')}
            className='border-2 border-gray-500 rounded p-2 m-2 bg-gray-200 shadow-xl text-black'
          />
        </div>
        <div className='flex justify-end mt-4'>
          <button
            className='border-2 border-gray-500 rounded-2xl p-2 bg-blue-200 text-black'
            onClick={() => calculate()}
          >
            Calculate
          </button>
        </div>
        <div className='mt-4'>
          {BMI === 0 ? (
            <p>Enter your weight and height to calculate your BMI</p>
          ) : BMI < 18.5 ? (
            <p>
              Your BMI is {BMI}. You are{' '}
              <span className='text-blue-700 font-bold'>underweight</span>. Talk
              to your doctor about your weight.
            </p>
          ) : BMI >= 18.5 && BMI < 25 ? (
            <p>
              Your BMI is {BMI}. You have a{' '}
              <span className='text-green-700 font-bold'>normal weight</span>.
              Keep up the good work.
            </p>
          ) : BMI >= 25 && BMI < 30 ? (
            <p>
              Your BMI is {BMI}. You are{' '}
              <span className='text-yellow-500 font-bold'>overweight</span>.
              Talk to your doctor about your weight.
            </p>
          ) : BMI >= 30 && BMI < 35 ? (
            <p>
              Your BMI is {BMI}. You are in{' '}
              <span className='text-orange-500 font-bold'>Obesity Class I</span>
              . Talk to your doctor about your weight.
            </p>
          ) : BMI >= 35 && BMI < 40 ? (
            <p>
              Your BMI is {BMI}. You are in{' '}
              <span className='text-red-500 font-bold'>Obesity Class II</span>.
              Talk to your doctor about your weight.
            </p>
          ) : BMI >= 40 ? (
            <p>
              Your BMI is {BMI}. You are in{' '}
              <span className='text-purple-900 font-bold'>
                Obesity Class III
              </span>
              . Talk to your doctor about your weight.
            </p>
          ) : null}
        </div>
      </div>
      <BMIClassificationTable />
      <div className='mb-4'>
        <h1>Why is BMI important to know?</h1>
        <p>
          BMI is a good way to check your risk of diseases related to body fat.
          Living with overweight or obesity is associated with an increased risk
          of mortality and other diseases or conditions. Generally, the higher
          your BMI, the greater the risk of developing other chronic
          obesity-related diseases.
        </p>
      </div>
    </div>
  );
}
