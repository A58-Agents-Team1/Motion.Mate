import { useContext, useEffect, useState } from 'react';
import {
  blockUserAsync,
  deleteUserAsync,
  getAllUsers,
  promoteToAdminAsync,
} from '../services/users.service';
import { AppContext } from '../context/AppContext';

export default function AdminPanel() {
  const { userData } = useContext(AppContext);
  const [allUsers, setAllUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getAllUsers();
      const users = Object.values(snapshot.val());
      const filteredData = users.filter(
        (user) => user.username !== userData?.username
      );
      setAllUsers(filteredData);
    };

    fetchUsers();
  }, [refresh]);

  const promoteToAdmin = async (user, role) => {
    await promoteToAdminAsync(user.username, role);
    setRefresh((prev) => !prev);
  };

  const toggleUserBlock = async (user) => {
    await blockUserAsync(user.username, !user.isBlocked);
    setRefresh((prev) => !prev);
  };

  const deleteUserAccount = async (user) => {
    await deleteUserAsync(user.username);
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <div className='flex justify-center my-2'>
        <h1 className='font-bold text-2xl mb-3'>Administrator Control Panel</h1>
      </div>
      <div>
        {allUsers.length !== 0 ? (
          allUsers.map((user) => (
            <div key={user.username}>
              <hr className='w-full border-t-2 border-gray-300' />
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <div className='avatar'>
                    <div className='avatar w-16 rounded-full border-1 border-black mr-2 my-3'>
                      {user?.avatar && (
                        <img src={user?.avatar} title='Account' alt='Account' />
                      )}
                    </div>
                  </div>

                  {user?.firstName && user?.lastName ? (
                    <h2 className='text-md font-bold mx-2'>
                      {`${user?.firstName} ${user?.lastName}`}
                    </h2>
                  ) : (
                    <h2 className='text-md font-bold mx-2'>{user?.username}</h2>
                  )}
                </div>
                <div>
                  {user?.userRole === 'user' ? (
                    <button
                      className='btn btn-success mx-2'
                      onClick={() => promoteToAdmin(user, 'admin')}
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      className='btn btn-error mx-2'
                      onClick={() => promoteToAdmin(user, 'user')}
                    >
                      Remove Admin
                    </button>
                  )}
                  {user?.isBlocked === false ? (
                    <button
                      className='btn btn-warning mx-2'
                      onClick={() => toggleUserBlock(user)}
                    >
                      Block User
                    </button>
                  ) : (
                    <button
                      className='btn btn-warning mx-2'
                      onClick={() => toggleUserBlock(user)}
                    >
                      Unblock User
                    </button>
                  )}
                  <button
                    className='btn btn-error mx-2'
                    onClick={() => deleteUserAccount(user)}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className='text-center'>No users found!</h1>
        )}
      </div>
    </div>
  );
}
