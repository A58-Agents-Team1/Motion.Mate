import { useNavigate } from 'react-router-dom';
import { shortFormatDate } from '../helper/format-date';
import Avatar from './Avatar';
import PropTypes from 'prop-types';
import AddAndRemoveFriendBtns from './AddAndRemoveFriendBtns';

export default function SingleUserView({ user, setRefresh }) {
  const navigate = useNavigate();

  return (
    <div className='card card-side shadow-xl m-4 border border-gray-400 rounded-2xl h-70 w-full'>
      <Avatar user={user} />
      <div className='container card-body text-left justify-between'>
        <div className='top-div text-center'>
          {user?.firstName && user?.lastName ? (
            <h2 className='font-bold mb-8'>{`${user?.firstName} ${user?.lastName}`}</h2>
          ) : (
            <h2 className='font-bold mb-8'>{user?.username}</h2>
          )}
          <p>Username: {user?.username}</p>
          <p>Member Since: {shortFormatDate(user?.createdOn)}</p>
        </div>
        <div className='bottom-div card-actions justify-end mt-4'>
          <AddAndRemoveFriendBtns
            friendUsername={user?.username}
            setRefresh={setRefresh}
          />
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
  setRefresh: PropTypes.func,
};
