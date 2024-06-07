import { useNavigate } from 'react-router-dom';
import { shortFormatDate } from '../../helper/format-date';
import Avatar from '../Avatar/Avatar';
import PropTypes from 'prop-types';
import {
  removeFriendRequestService,
  removeFriendService,
  sendRequestService,
} from '../../services/users.service';
import { onValue, ref } from 'firebase/database';
import { useContext, useEffect, useState } from 'react';
import { db } from '../../config/firebase-config';
import { AppContext } from '../../context/AppContext';

export default function SingleUserView({ user, setRefresh }) {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [isFriend, setIsFriend] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);
  const [hasMyRequest, setHasMyRequest] = useState(false);

  const handleSendFriendRequest = async () => {
    await sendRequestService(userData.username, user.username);
    setRefresh((prev) => !prev);
    setHasRequest(true);
  };

  const handleRemoveFriend = async () => {
    await removeFriendService(userData.username, user.username);
    setIsFriend(false);
    setHasRequest(false);
    setRefresh((prev) => !prev);
  };

  const handleRemoveFriendRequest = async () => {
    await removeFriendRequestService(userData.username, user.username);
    setIsFriend(false);
    setHasRequest(false);
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    return onValue(ref(db, `users/${userData.username}`), (snapshot) => {
      const data = snapshot?.val();

      const dataRequests = data?.requests || [];
      const dataFriends = data?.friends || [];
      const dataMyRequests = data?.myRequests || [];

      Object.keys(dataRequests).includes(user.username)
        ? setHasRequest(() => true)
        : setHasRequest(() => false);

      Object.keys(dataMyRequests).includes(user.username)
        ? setHasMyRequest(() => true)
        : setHasMyRequest(() => false);

      Object.keys(dataFriends).includes(user.username)
        ? setIsFriend(() => true)
        : setIsFriend(() => false);
    });
  }, [userData?.username, isFriend, hasRequest]);

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
          {hasRequest || hasMyRequest ? (
            <button
              type='button'
              onClick={handleRemoveFriendRequest}
              className='btn btn-error'
            >
              Remove Friend Request
            </button>
          ) : isFriend ? (
            <button
              type='button'
              onClick={handleRemoveFriend}
              className='btn btn-error'
            >
              Remove Friend
            </button>
          ) : (
            <button
              type='button'
              onClick={handleSendFriendRequest}
              className='btn btn-primary'
            >
              Add Friend
            </button>
          )}

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
