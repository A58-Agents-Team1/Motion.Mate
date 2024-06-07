import { useContext, useEffect, useState } from 'react';
import { getAllFriends } from '../../services/users.service';
import { AppContext } from '../../context/AppContext';
import SingleUserView from '../../components/SingleUser/SingleUserView';

export default function MyFriends() {
  const { userData } = useContext(AppContext);
  const [friendList, setFriendList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const friendList = await getAllFriends(userData?.username);
      setFriendList(friendList);
    };

    fetchUsers();
  }, [refresh]);

  return (
    <div>
      <div className='flex flex-col'>
        <ul>
          {friendList.length !== 0 ? (
            friendList.map((user) => (
              <li key={user.username}>
                <SingleUserView user={user} setRefresh={setRefresh} />
              </li>
            ))
          ) : (
            <h1 className='text-center'>
              Looks like you haven`t made any friends yet!
            </h1>
          )}
        </ul>
      </div>
    </div>
  );
}
