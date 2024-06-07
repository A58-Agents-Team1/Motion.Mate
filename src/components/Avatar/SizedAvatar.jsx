import userPhoto from '../../assets/userPhoto.png';
import PropTypes from 'prop-types';

export default function SizedAvatar({ user }) {
  return (
    <figure className='m-2 rounded-r-2xl'>
      {user?.avatar ? (
        <img
          src={user?.avatar}
          title='Profile Photo'
          alt='userPhoto'
          className='w-80 h-80 rounded-2xl'
        />
      ) : (
        <img
          src={userPhoto}
          alt='userPhoto'
          title='Missing Profile Photo'
          className='w-80 h-80 rounded-2xl'
        />
      )}
    </figure>
  );
}

SizedAvatar.propTypes = {
  user: PropTypes.object,
};
