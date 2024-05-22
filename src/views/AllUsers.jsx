import { useContext, useEffect, useState } from 'react';
import { getAllUsers } from '../services/users.service';
import SingleUserView from '../components/SingleUserView';
import { AppContext } from '../context/AppContext';

export default function AllUsers() {
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((snapshot) => {
      setUsers(Object.values(snapshot.val()));
    });
  }, []);

  return (
    <div className='flex flex-col'>
      <div>
        <ul>
          {users
            .filter((user) => user.username !== userData.username)
            .map((user) => (
              <li key={user.username}>
                <SingleUserView user={user} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
