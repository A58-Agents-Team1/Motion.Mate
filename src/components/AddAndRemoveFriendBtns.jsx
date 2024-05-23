import { useContext, useState } from 'react';
import {
  addFriendService,
  removeFriendService,
} from '../services/users.service';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';

export default function AddAndRemoveFriendBtns({ friendUsername }) {
  const { userData } = useContext(AppContext);
  const [isFriend, setIsFriend] = useState(false);

  const handleAddFriend = async () => {
    await addFriendService(userData?.username, friendUsername);
    setIsFriend(true);
  };

  const handleRemoveFriend = async () => {
    await removeFriendService(userData?.username, friendUsername);
    setIsFriend(false);
  };

  return (
    <>
      {!isFriend ? (
        <button onClick={handleAddFriend} className='btn btn-primary'>
          Add Friend
        </button>
      ) : (
        <button onClick={handleRemoveFriend} className='btn btn-primary'>
          Remove Friend
        </button>
      )}
    </>
  );
}

AddAndRemoveFriendBtns.propTypes = {
  username: PropTypes.string,
  friendUsername: PropTypes.string,
};
