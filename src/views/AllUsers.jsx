import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/users.service';
import SingleUserView from '../components/SingleUserView';

export default function AllUsers() {
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
          {users.map((user) => (
            <li key={user.username}>
              <SingleUserView user={user} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
