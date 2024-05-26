import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import userPhoto from '../../assets/userPhoto.png';

export function AvatarWithNameAndDropDownMenu() {
  const { userData, user } = useContext(AppContext);
  return (
    <div className='flex justify-end'>
      {user && (
        <div className='flex items-center'>
          <div>
            {userData?.firstName ? (
              <h2 className='text-4xl font-bold mx-2'>
                {`${userData?.firstName} ${userData?.lastName}`}
              </h2>
            ) : (
              <h2 className='text-2xl font-bold mx-2'>{userData?.username}</h2>
            )}
          </div>
          <div className='dropdown dropdown-hover flex items-center'>
            <div>
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
                className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-gray-400 absolute right-0'
              >
                <li>
                  <NavLink to='/my-profile'>My Profile</NavLink>
                </li>
                <li>
                  <NavLink to='/my-friends'>My Friends</NavLink>
                </li>
                <li>
                  <NavLink to='/all-users'>All Users</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AvatarWithName() {
  const { userData, user } = useContext(AppContext);
  return (
    user && (
      <div className='flex items-center justify-left'>
        <div className='avatar'>
          <div className='avatar w-16 rounded-full border-1 border-black mr-2 mb-2'>
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

        {userData?.firstName ? (
          <h2 className='text-4xl font-bold mx-2'>
            {`${userData?.firstName} ${userData?.lastName}`}
          </h2>
        ) : (
          <h2 className='text-2xl font-bold mx-2'>{userData?.username}</h2>
        )}
      </div>
    )
  );
}
