import { useParams } from 'react-router-dom';
import { getUserByUsername } from '../services/users.service';
import { useEffect, useState } from 'react';
import Avatar from '../components/Avatar';
import { NavLink } from 'react-router-dom';
import { formatDate } from '../helper/format-date';

export default function FullProfileView() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    try {
      getUserByUsername(id).then((snapshot) => {
        setUser(snapshot.val());
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  return (
    <div className='card card-side shadow-xl m-4 border border-gray-400 h-70 w-full flex flex-row rounded-2xl'>
      <Avatar user={user} />
      <div className='card-body text-center flex flex-col'>
        <p>{user?.username}</p>
        <p className='text-gray-700'>{user?.email}</p>
        <div className='mt-5'>
          <button className='btn btn-primary mr-4'>Add Friend</button>
          <NavLink to={'/all-users'} className='btn btn-error'>
            Back
          </NavLink>
        </div>
        <p className='pt-8'>Member Since: {formatDate(user?.createdOn)}</p>
      </div>
    </div>
  );
}
