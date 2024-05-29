import { useContext, useEffect, useState } from 'react';
import {
  sendRequestService,
  checkFriendStatusService,
  removeFriendService,
  checkFriendRequestService,
  removeFriendRequestService,
} from '../services/users.service';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';

export default function AddAndRemoveFriendBtns({ friendUsername, setRefresh }) {
  const { userData } = useContext(AppContext);
  const [isFriend, setIsFriend] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);
  const [localRefresh, setLocalRefresh] = useState(false);

  const handleSendFriendRequest = async () => {
    await sendRequestService(userData?.username, friendUsername);
    setRefresh((prev) => !prev);
    setLocalRefresh((prev) => !prev);
  };

  const handleRemoveFriend = async () => {
    await removeFriendService(userData?.username, friendUsername);
    setIsFriend(false);
    setRefresh((prev) => !prev);
    setLocalRefresh((prev) => !prev);
  };

  const handleRemoveFriendRequest = async () => {
    await removeFriendRequestService(userData?.username, friendUsername);
    setIsFriend(false);
    setRefresh((prev) => !prev);
    setLocalRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchFriendStatus = async () => {
      const status = await checkFriendStatusService(
        userData?.username,
        friendUsername
      );
      setIsFriend(status);
    };
    const fetchFriendRequest = async () => {
      const status = await checkFriendRequestService(
        userData?.username,
        friendUsername
      );
      setHasRequest(status);
    };

    fetchFriendRequest();
    fetchFriendStatus();
  }, [userData?.username, friendUsername, localRefresh]);

  return (
    <>
      {!isFriend ? (
        hasRequest ? (
          <button
            onClick={handleRemoveFriendRequest}
            className='btn btn-error'
          >
            Remove Friend Request
          </button>
        ) : (
          <button
            onClick={handleSendFriendRequest}
            className='btn btn-primary'
          >
            Add Friend
          </button>
        )
      ) : (
        <button
          onClick={handleRemoveFriend}
          className='btn btn-error'
        >
          Remove Friend
        </button>
      )}
    </>
  );
}

AddAndRemoveFriendBtns.propTypes = {
  username: PropTypes.string,
  friendUsername: PropTypes.string,
  setRefresh: PropTypes.func,
};
