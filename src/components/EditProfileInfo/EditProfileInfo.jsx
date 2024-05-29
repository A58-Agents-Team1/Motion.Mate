import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { updateUserByUsername } from '../../services/users.service';
import {
  validateAge,
  validateFieldsForAdditionalInfo,
  validateHeight,
  validatePhoneNumberAsync,
  validateWeight,
} from '../../common/user.validations';
import { alertHelper } from '../../helper/alert-helper';
import AlertSuccess from '../Alerts/AlertSuccess';
import AlertError from '../Alerts/AlertError';

export default function EditProfileInfo({ setEditProfile }) {
  const { userData } = useContext(AppContext);
  const [message, setMessage] = useState(null);
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    age: userData?.age || '',
    weight: userData?.weight || '',
    height: userData?.height || '',
    phoneNumber: userData?.phoneNumber || '',
  });

  const updateForm = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const validateFieldsAsync = async () => {
    validateFieldsForAdditionalInfo(form);
    if (userData?.age !== form.age) {
      validateAge(form.age);
    }
    if (userData.weight !== form.weight) {
      validateWeight(form.weight);
    }
    if (userData?.height !== form.height) {
      validateHeight(form.height);
    }
    if (userData?.phoneNumber !== form.phoneNumber) {
      await validatePhoneNumberAsync(form.phoneNumber);
    }
  };

  const editProfileInformation = async () => {
    try {
      await validateFieldsAsync();
      await updateUserByUsername(userData?.username, form);
      setEditProfile(false);
      alertHelper(setMessage, setSuccess, 'Info Changed successfully!');
    } catch (error) {
      alertHelper(setMessage, setAlert, error.message);
    }
  };

  return (
    <div className='flex flex-col text-center mx-2'>
      <h1 className='mb-4 text-xl'>
        <p>Greetings, {userData?.username}! Ready to make updates? </p>
        <p>Edit your account details here.</p>
      </h1>
      <div className='border-2 border-gray-500 rounded p-4 shadow-lg flex items-center justify-center'>
        <div className='mr-4 flex flex-col text-left text-lg px-4'>
          <p className='font-bold underline'>Edit profile info here:</p>
          <label htmlFor='firstName'>First Name:</label>
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            id='firstName'
            value={form?.firstName}
            onChange={updateForm('firstName')}
            className='border-2 border-gray-500 rounded p-2 m-2 bg-gray-200 shadow-xl text-black'
          />
          <label htmlFor='lastName'>Last Name:</label>
          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            id='lastName'
            value={form?.lastName}
            onChange={updateForm('lastName')}
            className='border-2 border-gray-500 rounded p-2 m-2 bg-gray-200 shadow-xl text-black'
          />
          <label htmlFor='age'>Age:</label>
          <input
            type='number'
            name='age'
            placeholder='Age'
            id='age'
            value={form?.age}
            onChange={updateForm('age')}
            className='border-2 border-gray-500 rounded p-2 m-2 bg-gray-200 shadow-xl text-black'
          />
          <label htmlFor='weight'>Weight in kg:</label>
          <input
            type='number'
            name='weight'
            placeholder='Weight'
            id='weight'
            value={form?.weight}
            onChange={updateForm('weight')}
            className='border-2 border-gray-500 rounded p-2 m-2 bg-gray-200 shadow-xl text-black'
          />
          <label htmlFor='height'>Height in sm:</label>
          <input
            type='number'
            name='height'
            placeholder='Height'
            id='height'
            value={form?.height}
            onChange={updateForm('height')}
            className='border-2 border-gray-500 rounded p-2 m-2 bg-gray-200 shadow-xl text-black'
          />
          <label htmlFor='phoneNumber'>Phone Number:</label>
          <input
            type='number'
            name='phoneNumber'
            placeholder='Phone Number'
            id='phoneNumber'
            value={form?.phoneNumber}
            onChange={updateForm('phoneNumber')}
            className='border-2 border-gray-500 rounded p-2 m-2 bg-gray-200 shadow-xl text-black'
          />
        </div>
        <div className='text-center text-lg ml-4 px-4'>
          <p className='font-bold underline'>Main Information:</p>
          {userData?.username ? (
            <p className='my-4'>UserName: {userData?.username}</p>
          ) : (
            <p className='my-4'>UserName: Missing information</p>
          )}
          <p className='my-4'>Email: {userData?.email}</p>
          {userData?.firstName ? (
            <p className='my-4'>First Name: {userData?.firstName}</p>
          ) : (
            <p className='my-4'>First Name: Missing information</p>
          )}
          {userData?.lastName ? (
            <p className='my-4'>Last Name: {userData?.lastName}</p>
          ) : (
            <p className='my-4'>Last Name: Missing information</p>
          )}
          {userData?.age ? (
            <p className='my-4'>Age: {userData?.age} years old</p>
          ) : (
            <p className='my-4'>Age: Missing information</p>
          )}
          {userData?.weight ? (
            <p className='my-4'>Weight: {userData?.weight} kg</p>
          ) : (
            <p className='my-4'>Weight: Missing information</p>
          )}
          {userData?.height ? (
            <p className='my-4'>Height: {userData?.height} sm</p>
          ) : (
            <p className='my-4'>Height: Missing information</p>
          )}
          {userData?.phoneNumber && userData?.phoneNumber !== '' ? (
            <p className='my-4'>Phone: {userData?.phoneNumber}</p>
          ) : (
            <p className='my-4'>Phone: Missing information</p>
          )}
          <div className='my-5'>
            <button
              className='btn btn-primary mr-4'
              onClick={() => editProfileInformation()}
            >
              Save Changes
            </button>
            <button
              className='btn btn-error'
              onClick={() => setEditProfile(false)}
            >
              Discard Changes
            </button>
          </div>
        </div>
      </div>
      {success && <AlertSuccess message={message} />}
      {alert && <AlertError message={message} />}
    </div>
  );
}

EditProfileInfo.propTypes = {
  setEditProfile: PropTypes.func.isRequired,
};
