import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import userPhoto from '../../assets/userPhoto.png';

export default function AvatarWithName() {
  const { userData, user } = useContext(AppContext);
  return (
    <div className='flex-1 px-2 mx-2 '>
      {user && (
        <div className='flex items-center px-2 mx-2'>
          <div className='dropdown dropdown-hover'>
            <div className='avatar'>
              <div className='avatar w-16 rounded-full border-1 border-black'>
                {userData?.avatar ? (
                  <img src={userData?.avatar} title='Account' alt='Account' />
                ) : (
                  <img
                    src={userPhoto}
                    alt='userPhoto'
                    className='fill-current'
                    title='User Photo'
                  />
                )}
              </div>
            </div>

            <ul
              tabIndex={0}
              className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <NavLink to='/my-profile'>My Profile</NavLink>
              </li>
              <li>
                <button>Users</button>
              </li>
            </ul>
          </div>

          {userData?.firstName ? (
            <h2 className='text-4xl font-bold mx-2'>
              {`${userData?.firstName} ${userData?.lastName}`}
            </h2>
          ) : (
            <h2 className='text-2xl font-bold mx-2'>{userData?.username}</h2>
          )}
        </div>
      )}
    </div>
  );
}
