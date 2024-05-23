import userPhoto from '../assets/userPhoto.png';
import PropTypes from 'prop-types';

export default function Avatar({ user }) {
  return (
    <figure className='m-2'>
      {user?.avatar ? (
        <img
          src={user?.avatar}
          title='Profile Photo'
          alt='userPhoto'
          className='w-80 h-full fill-current rounded-2xl'
        />
      ) : (
        <img
          src={userPhoto}
          alt='userPhoto'
          title='Missing Profile Photo'
          className='w-80 h-full fill-current rounded-2xl'
        />
      )}
    </figure>
  );
}

Avatar.propTypes = {
  user: PropTypes.object.isRequired,
};
