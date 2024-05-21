import PropTypes from 'prop-types';
import userPhoto from '../assets/userPhoto.png';

export default function SingleUserView({ user }) {
  return (
    <div className='card card-side shadow-xl m-4 border border-gray-400 h-70 w-full'>
      <figure>
        {user?.avatar ? (
          <img
            src={user?.avatar}
            title='Profile Photo'
            alt='userPhoto'
            className='w-80 h-full fill-current'
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
      <div className='card-body text-center'>
        {user?.firstName ? (
          <h2 className='card-title'>{`${user?.firstName} ${user?.lastName}`}</h2>
        ) : (
          <h2 className='card-title'>{user?.username}</h2>
        )}

        <p></p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Add Friend</button>
          <button className='btn btn-primary'>View Profile</button>
        </div>
      </div>
    </div>
  );
}

SingleUserView.propTypes = {
  user: PropTypes.object.isRequired,
};
