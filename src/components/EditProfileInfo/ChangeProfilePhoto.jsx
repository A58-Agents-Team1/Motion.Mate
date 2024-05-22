import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import userPhoto from '../../assets/userPhoto.png';
import { uploadPhoto } from '../../services/users.service';

export default function ChangeProfilePhoto({ setChangeProfilePhoto }) {
  const { userData } = useContext(AppContext);
  const [imageUpload, setImageUpload] = useState(null);

  const uploadNewProfilePhoto = async () => {
    if (!imageUpload) {
      setImageUpload(null);
      return alert('Error: Please select an image');
    }
    await uploadPhoto(imageUpload, userData?.username);

    setImageUpload(null);
    setChangeProfilePhoto(false);
  };

  return (
    <div className='flex flex-col text-center'>
      <h1 className='mb-4'>
        <p>
          Greetings, {userData?.username}! Ready to give your profile a
          makeover?
        </p>
        <p>Upload or change your profile photo here.</p>
      </h1>
      <div className='border-2 border-gray-500 rounded p-4 shadow-lg flex flex-col items-center'>
        <div className='flex items-center'>
          <div className='mr-4'>
            {userData?.avatar ? (
              <img
                src={userData?.avatar}
                alt='Profile Photo'
                className='w-auto h-64 max-w-full rounded-md object-cover shadow-xl'
              />
            ) : (
              <img
                src={userPhoto}
                alt='User Photo'
                className='w-auto h-64 max-w-full rounded-md object-cover shadow-xl'
                title='User Photo'
              />
            )}
          </div>
          <div className='text-center'>
            {imageUpload !== null && (
              <img
                src={URL.createObjectURL(imageUpload)}
                alt='Profile Photo'
                className='w-auto h-64 max-w-full rounded-md object-cover shadow-xl'
              />
            )}
          </div>
        </div>
        <div className='mt-5'>
          <input
            type='file'
            accept='image/*'
            name='profilePhoto'
            id='profilePhoto'
            onChange={(e) => setImageUpload(e.target.files[0])}
            className='file-input file-input-bordered file-input-primary w-full max-w-xs mr-2'
          />
          <button
            className='btn btn-primary mr-2'
            onClick={() => uploadNewProfilePhoto()}
          >
            Save Changes
          </button>
          <button
            className='btn btn-error'
            onClick={() => setChangeProfilePhoto(false)}
          >
            Discard Changes
          </button>
        </div>
      </div>
    </div>
  );
}

ChangeProfilePhoto.propTypes = {
  setChangeProfilePhoto: PropTypes.func.isRequired,
};
