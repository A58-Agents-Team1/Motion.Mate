import bellIcon from '../../../assets/bellIcon.png';
import accept from '../../../assets/accept.png';
import decline from '../../../assets/decline.png';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import {
  addFriendService,
  getAllUsersDataRequests,
  removeFriendRequestService,
} from '../../../services/users.service';
import DropDownNoNotifications from './DropDownWithoutNotifications';

export default function Notifications() {
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [requestsCount, setRequestsCount] = useState(0);

  const handleAddFriend = async (friendUsername) => {
    try {
      await addFriendService(userData?.username, friendUsername);
    } catch (error) {
      console.error('Error adding friend:', error.message);
    }
  };

  const handleRemoveFriendRequest = async (friendUsername) => {
    try {
      await removeFriendRequestService(userData?.username, friendUsername);
    } catch (error) {
      console.error('Error removing friend request:', error.message);
    }
  };

  useEffect(() => {
    return onValue(ref(db, `users/${userData?.username}`), (snapshot) => {
      console.log(snapshot?.val());
      const fetchUserRequests = async () => {
        if (snapshot?.val() && snapshot?.val()?.requests) {
          const userRequests = await getAllUsersDataRequests(
            snapshot.val()?.username
          );
          console.log('userRequests:', userRequests);
          setUsers(userRequests);
          setRequestsCount(
            snapshot.val()?.requests
              ? Object.keys(snapshot.val().requests).length
              : 0
          );
        }
      };

      fetchUserRequests();
    });
  }, []);

  return (
    <div className='dropdown dropdown-hover flex items-center'>
      {users.length !== 0 ? (
        <div>
          <div className='relative flex mr-2'>
            <img src={bellIcon} alt='bell' className='w-12' />
            <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>
              {requestsCount}
            </span>
          </div>

          <ul
            tabIndex={0}
            className='text-center dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80 border border-gray-400 absolute right-0'
          >
            {users?.map((user) => {
              return (
                <li key={user?.username} className='p-2'>
                  <div className='flex flex-row items-center'>
                    <div className='flex items-center mr-5'>
                      <img
                        src={user?.avatar}
                        title={`${user?.username}`}
                        alt='Account'
                        className='avatar w-16 rounded-2xl m-2'
                      />
                      <p>{user?.username}</p>
                    </div>
                    <div>
                      <button
                        className=' btn-primary ml-6'
                        onClick={() => handleAddFriend(user?.username)}
                      >
                        <img src={accept} alt='accept' className='w-8' />
                      </button>
                      <button
                        className=' btn-primary ml-4'
                        onClick={() =>
                          handleRemoveFriendRequest(user?.username)
                        }
                      >
                        <img src={decline} alt='decline' className='w-7' />
                      </button>
                    </div>
                  </div>
                  <hr className='w-full border-t-2 border-gray-300' />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <DropDownNoNotifications />
      )}
    </div>
  );
}
