import { useContext, useEffect, useState } from 'react';
import {
  addFriendService,
  checkFriendStatusService,
  removeFriendService,
} from '../services/users.service';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';

export default function AddAndRemoveFriendBtns({ friendUsername, setRefresh }) {
  const { userData } = useContext(AppContext);
  const [isFriend, setIsFriend] = useState(false);

  const handleAddFriend = async () => {
    await addFriendService(userData?.username, friendUsername);
    setIsFriend(true);
    setRefresh((prev) => !prev);
  };

  const handleRemoveFriend = async () => {
    await removeFriendService(userData?.username, friendUsername);
    setIsFriend(false);
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchFriendStatus = async () => {
      const status = await checkFriendStatusService(
        userData?.username,
        friendUsername
      );
      setIsFriend(status);
    };

    fetchFriendStatus();
  }, [userData?.username, friendUsername]);

  return (
    <>
      {!isFriend ? (
        <button onClick={handleAddFriend} className='btn btn-primary'>
          Add Friend
        </button>
      ) : (
        <button onClick={handleRemoveFriend} className='btn btn-error'>
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
