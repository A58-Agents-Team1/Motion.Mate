import userPhoto from '../../assets/userPhoto.png';
import PropTypes from 'prop-types';

export default function Avatar({ user }) {
  return (
    <figure className='m-2 rounded-r-2xl'>
      {user?.avatar ? (
        <img
          src={user?.avatar}
          title='Profile Photo'
          alt='userPhoto'
          className='w-80 h-80'
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

export function FullAvatar({ user }) {
  return (
    <figure className='m-2 rounded-r-2xl'>
      {user?.avatar ? (
        <img
          src={user?.avatar}
          title='Profile Photo'
          alt='userPhoto'
          className='w-full h-80 rounded-2xl'
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
  user: PropTypes.object,
};

FullAvatar.propTypes = {
  user: PropTypes.object,
};
