import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useSearchParams } from 'react-router-dom';
import {
  getAllUsers,
  getFilterUserBySearchTerm,
} from '../services/users.service';
import SingleUserView from '../components/SingleUserView';

export default function AllUsers() {
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [searchBy, setSearchBy] = useState('firstName');
  const [sortBy, setSortBy] = useState('username');
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

  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === 'username') {
      return a.username.toLowerCase().localeCompare(b.username.toLowerCase());
    } else if (sortBy === 'createdOn') {
      return new Date(b.createdOn) - new Date(a.createdOn);
    }
    return 0;
  });

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
        <div className='dropdown'>
          <div
            tabIndex={0}
            role='button'
            className='btn m-1 border border-gray-500 rounded-2xl'
          >
            Sort Users By:
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2 border border-gray-500'
          >
            <li>
              <a
                name='username'
                onClick={() => setSortBy('username')}
                className={`btn ${
                  sortBy === 'username'
                    ? 'btn-active border-white bg-gray-400 text-black'
                    : 'btn-outline border-white'
                } rounded-2xl shadow-2xl `}
              >
                User Name
              </a>
            </li>
            <li>
              <a
                name='createdOn'
                onClick={() => setSortBy('createdOn')}
                className={`btn ${
                  sortBy === 'createdOn'
                    ? 'btn-active border-white bg-gray-400 text-black'
                    : 'btn-outline border-white'
                } rounded-2xl shadow-2xl mt-2`}
              >
                Last Created
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='flex flex-col'>
        <ul>
          {sortedUsers.length !== 0 ? (
            sortedUsers
              .filter((user) => user.username !== userData.username)
              .map((user) => (
                <li key={user.username}>
                  <SingleUserView user={user} />
                </li>
              ))
          ) : searchParams === '' ? (
            <h1 className='text-center'>No Users Found</h1>
          ) : (
            <h1 className='text-center mt-4'>
              No users matched your search by <strong>{searchBy}</strong> with{' '}
              <strong>{search}</strong>.
            </h1>
          )}
        </ul>
      </div>
    </div>
  );
}
