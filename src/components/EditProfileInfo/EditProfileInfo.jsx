import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { updateUserByUsername } from '../../services/users.service';

export default function EditProfileInfo({ setEditProfile }) {
  const { userData } = useContext(AppContext);
  const [form, setForm] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    phoneNumber: userData?.phoneNumber || '',
  });

  const updateForm = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const editProfileInformation = async () => {
    try {
      await updateUserByUsername(userData?.username, form);
      console.log('form', form);
      setEditProfile(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='flex flex-col text-center'>
      <h1 className='mb-4'>
        <p>Greetings, {userData?.username}! Ready to make updates? </p>
        <p>Edit your account details here.</p>
      </h1>
      <div className='border-2 border-gray-500 rounded p-4 shadow-lg flex items-center justify-center'>
        <div className='mr-4 flex flex-col text-left'>
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
          <label htmlFor='phoneNumber'>Phone Number:</label>
          <input
            type='text'
            name='phoneNumber'
            placeholder='Phone Number'
            id='phoneNumber'
            value={form?.phoneNumber}
            onChange={updateForm('phoneNumber')}
            className='border-2 border-gray-500 rounded p-2 m-2 bg-gray-200 shadow-xl text-black'
          />
        </div>
        <div className='text-center'>
          <p className='font-bold underline'>Main Information:</p>
          {userData?.username ? (
            <p className='mb-2 mt-2'>UserName: {userData?.username}</p>
          ) : (
            <p className='mb-2 mt-2'>UserName: Missing information</p>
          )}
          <p className='mb-2'>Email: {userData?.email}</p>
          {userData?.firstName ? (
            <p className='mb-2'>First Name: {userData?.firstName}</p>
          ) : (
            <p className='mb-2'>First Name: Missing information</p>
          )}
          {userData?.lastName ? (
            <p className='mb-2'>Last Name: {userData?.lastName}</p>
          ) : (
            <p className='mb-2'>Last Name: Missing information</p>
          )}
          {userData?.phoneNumber && userData?.phoneNumber !== '' ? (
            <p className='mb-2'>Phone: {userData?.phoneNumber}</p>
          ) : (
            <p className='mb-2'>Phone: Missing information</p>
          )}
          <div className='mt-5'>
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
    </div>
  );
}

EditProfileInfo.propTypes = {
  setEditProfile: PropTypes.func.isRequired,
};
