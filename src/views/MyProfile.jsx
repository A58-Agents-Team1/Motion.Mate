import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { formatDate } from '../helper/format-date';
import EditProfileInfo from '../components/EditProfileInfo/EditProfileInfo';
import ChangeProfilePhoto from '../components/EditProfileInfo/ChangeProfilePhoto';
import { getUserByUsername } from '../services/users.service';
import Avatar from '../components/Avatar';

export default function MyProfile() {
  const { userData, setAppState } = useContext(AppContext);
  const [editProfile, setEditProfile] = useState(false);
  const [changeProfilePhoto, setChangeProfilePhoto] = useState(false);

  useEffect(() => {
    getUserByUsername(userData?.username).then((res) => {
      setAppState((prev) => {
        return { ...prev, userData: res.val() };
      });
    });
  }, [userData?.username, editProfile, changeProfilePhoto]);

  return (
    <div className='flex flex-col text-center'>
      {userData && editProfile === false && changeProfilePhoto === false ? (
        <div className='flex flex-col text-center'>
          <h1 className='mb-4'>
            Greetings, {userData?.username}! Explore all the details about your
            account here.
          </h1>
          <div className='border-2 border-gray-500 rounded p-4 shadow-lg flex items-center'>
            <div className='mr-4'>
              <Avatar user={userData} />
            </div>
            <div className='text-center'>
              <p className='font-bold underline'>Main Information:</p>
              {userData?.username ? (
                <p>UserName: {userData?.username}</p>
              ) : (
                <p>UserName: Missing information</p>
              )}
              <p>Email: {userData?.email}</p>
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
              {userData?.phoneNumber && userData?.phoneNumber !== '' ? (
                <p>Phone: {userData?.phoneNumber}</p>
              ) : (
                <p>Phone: Missing information</p>
              )}
              <div className='mt-5'>
                <button
                  onClick={() => setEditProfile(!editProfile)}
                  className='btn btn-primary mr-3'
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setChangeProfilePhoto(!changeProfilePhoto)}
                  className='btn btn-primary'
                >
                  Change Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : editProfile === true ? (
        <EditProfileInfo setEditProfile={setEditProfile} />
      ) : (
        <ChangeProfilePhoto setChangeProfilePhoto={setChangeProfilePhoto} />
      )}
      <p className='mt-4'>
        Account created on: {formatDate(userData?.createdOn)}
      </p>
    </div>
  );
}
