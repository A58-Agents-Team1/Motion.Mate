import { useContext, useEffect, useState } from 'react';
import {
  getAllUsers,
  getFilterUserBySearchTerm,
} from '../services/users.service';
import { AppContext } from '../context/AppContext';
import { useSearchParams } from 'react-router-dom';
import SingleUserView from '../components/SingleUserView';

export default function AllUsers() {
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [searchBy, setSearchBy] = useState('firstName');
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  const setSearch = (value) => {
    setSearchParams({ search: value });
  };

  useEffect(() => {
    getFilterUserBySearchTerm(searchBy, search).then(setUsers);
  }, [searchBy, search]);

  useEffect(() => {
    getAllUsers().then((snapshot) => {
      setUsers(Object.values(snapshot.val()));
    });
  }, []);

  return (
    <div>
      <div className='flex items-center space-x-2 mt-4'>
        <div className='flex items-center space-x-1'>
          <p>Search By:</p>
          <button
            name='searchBy'
            value='username'
            onClick={(e) => setSearchBy(e.target.value)}
            className='btn btn-outline rounded-2xl shadow-2xl'
          >
            Username
          </button>
          <button
            name='searchBy'
            value='firstName'
            onClick={(e) => setSearchBy(e.target.value)}
            className='btn btn-outline rounded-2xl shadow-2xl'
          >
            First Name
          </button>
        </div>
        <div>
          <input
            type='text'
            name='search'
            id='search'
            value={search}
            placeholder={`search users by ${searchBy}`}
            onChange={(e) => setSearch(e.target.value)}
            className='p-2 border-2 border-gray-200 rounded-lg w-60 bg-gray-200 text-black'
          />
        </div>
      </div>
      <div className='flex flex-col'>
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
