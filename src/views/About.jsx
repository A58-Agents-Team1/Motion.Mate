import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/users.service';
import backgroundUsers from '../assets/backgroundUsers.png';

export default function About() {
  const [countUser, setCountUser] = useState();

  useEffect(() => {
    getAllUsers().then((snapshot) => {
      setCountUser(Object.values(snapshot.val()).length);
    });
  }, [countUser]);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-bold text-4xl mb-3'>About</h1>
      <div className='card h-40 w-60 bg-base-100 shadow-xl image-full rounded-3xl'>
        <figure>
          <img src={backgroundUsers} alt='Users' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title underline'>Registered Users</h2>
          <p>
            Currently, there are <strong>{countUser}</strong> registered users.
            👤
          </p>
        </div>
      </div>
    </div>
  );
}
