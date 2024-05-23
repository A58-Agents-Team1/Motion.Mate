import userPhoto from '../assets/userPhoto.png';
import PropTypes from 'prop-types';

export default function Avatar({ user }) {
  return (
    <figure>
      {user?.avatar ? (
        <img
          src={user?.avatar}
          title='Profile Photo'
          alt='userPhoto'
          className='w-80 h-full fill-current rounded-2xl shadow-xl'
        />
      ) : (
        <img
          src={userPhoto}
          alt='userPhoto'
          title='Missing Profile Photo'
          className='w-80 h-full fill-current'
        />
      )}
    </figure>
  );
}

Avatar.propTypes = {
  user: PropTypes.object.isRequired,
};
