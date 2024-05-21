import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { formatDate } from '../helper/format-date';
import userPhoto from '../assets/userPhoto.png';

export default function MyProfile() {
  const { userData } = useContext(AppContext);
  return (
    <div className='flex flex-col text-center'>
      <h1 className='mb-2'>My Profile Information</h1>
      <div className='border-2 border-gray-500 rounded p-4 shadow-lg flex items-center'>
        <div className='mr-4'>
          {userData?.avatar ? (
            <img
              src={userData?.avatar}
              alt='Profile Photo'
              className='w-auto h-64 max-w-full rounded-md object-cover'
            />
          ) : (
            <img
              src={userPhoto}
              alt='userPhoto'
              className='w-auto h-64 max-w-full rounded-md object-cover'
              title='User Photo'
            />
          )}
        </div>
        <div className='text-left'>
          {userData?.firstName ? (
            <p>First Name: {userData?.firstName}</p>
          ) : (
            <p>First Name: Missing information</p>
          )}
          {userData?.lastName ? (
            <p>Last Name: {userData?.lastName}</p>
          ) : (
            <p>Last Name: Missing information</p>
          )}
          {userData?.username ? (
            <p>UserName: {userData?.username}</p>
          ) : (
            <p>UserName: Missing information</p>
          )}
          <p>Email: {userData?.email}</p>
          {userData?.phoneNumber && userData?.phoneNumber !== '' ? (
            <p>Phone: {userData?.phoneNumber}</p>
          ) : (
            <p>Phone: Missing information</p>
          )}
          <div className='mt-5'>
            <button className='btn btn-primary mr-3'>Edit Profile</button>
            <button className='btn btn-primary'>Change Photo</button>
          </div>
        </div>
      </div>
      <p className='mt-2'>
        Account created on: {formatDate(userData?.createdOn)}
      </p>
    </div>
  );
}
