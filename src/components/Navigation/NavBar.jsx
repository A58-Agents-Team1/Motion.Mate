import { NavLink } from 'react-router-dom';
import { AppContext } from '../../context/AppContext.js';
import { useContext, useEffect, useState } from 'react';
import { logoutUser } from '../../services/auth.service.js';
import { useNavigate } from 'react-router-dom';
import ThemeChangeIcons from './ThemeChangeIcons.jsx';
import AvatarWithName from './AvatarWithName.jsx';
import { DARK_THEME, LIGHT_THEME } from '../../common/constants.js';

export const NavBar = () => {
  const { setAppState, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    !localStorage.getItem('theme') ? LIGHT_THEME : localStorage.getItem('theme')
  );

  const handleToggle = (e) => {
    setTheme(e.target.checked ? DARK_THEME : LIGHT_THEME);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  const logout = async (e) => {
    e.preventDefault();
    await logoutUser();
    setAppState({ user: null, userData: null });
    navigate('/');
  };

  return (
    <div className='drawer'>
      <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col'>
        {/* Navbar */}
        <div className='w-full navbar bg-base-300 flex justify-between px-3'>
          <div>
            <ThemeChangeIcons toggleTheme={handleToggle} currentTheme={theme} />
            <div className='flex-none lg:hidden'>
              <label
                htmlFor='my-drawer-3'
                aria-label='open sidebar'
                className='btn btn-square btn-ghost'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block w-6 h-6 stroke-current'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  ></path>
                </svg>
              </label>
            </div>
            <div className='flex-none hidden lg:block'>
              <ul className='menu menu-horizontal items-center '>
                {/* Navbar menu content here */}
                <li>
                  <NavLink to={'/'}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={'/about'}>About</NavLink>
                </li>
                {!userData ? (
                  <>
                    <li>
                      <NavLink to={'/login'}>Login</NavLink>
                    </li>

                    <li>
                      <NavLink to={'/register'}>Register</NavLink>
                    </li>
                  </>
                ) : (
                  <div className='flex gap-2 items-center mx-2'>
                    {userData && <p>{userData?.email}</p>}
                    <li>
                      <button onClick={(e) => logout(e)}>Logout</button>
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </div>
          <div className='flex justify-end'>
            <AvatarWithName />
          </div>
        </div>
        {/* Page content here */}
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-3'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <ul className='menu p-4 w-80 min-h-full bg-base-200 gap-2 '>
          {/* Sidebar content here */}

          {userData && (
            <div className='textarea-lg '>
              Hello
              <p>{userData?.email}</p>
            </div>
          )}
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/about'}>About</NavLink>
          </li>
          {!userData ? (
            <>
              <li>
                <NavLink to={'/login'}>Login</NavLink>
              </li>

              <li>
                <NavLink to={'/register'}>Register</NavLink>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={(e) => logout(e)}
                className={
                  'btn-ghost  text-primary-contrast bg-primary-500 hover:bg-primary-600'
                }
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
