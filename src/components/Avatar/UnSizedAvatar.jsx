import PropTypes from 'prop-types';
import userPhoto from '../../assets/userPhoto.png';

export default function UnSizedAvatar({ user }) {
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
          className='w-full h-80 rounded-2xl'
        />
      )}
    </figure>
  );
}

UnSizedAvatar.propTypes = {
  user: PropTypes.object,
};
