import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

export default function SingleUserView({ user }) {
  const navigate = useNavigate();

  return (
    <div className='card card-side shadow-xl m-4 border border-gray-400 rounded-2xl h-70 w-full'>
      <Avatar user={user} />
      <div className='card-body text-center'>
        {user?.firstName ? (
          <h2 className='card-title'>{`${user?.firstName} ${user?.lastName}`}</h2>
        ) : (
          <h2 className='card-title'>{user?.username}</h2>
        )}

        <p></p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Add Friend</button>
          <button
            onClick={() => navigate(`/users/${user?.username}`)}
            className='btn btn-primary'
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}

SingleUserView.propTypes = {
  user: PropTypes.object.isRequired,
};
