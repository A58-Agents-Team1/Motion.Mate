import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import logo from '../../../assets/logo.png';
import github from '../../../assets/github.png';
import about from '../../../assets/about.png';
import contact from '../../../assets/contact.png';
import { BASE } from '../../../common/constants';
import { AppContext } from '../../../context/AppContext';

export const Footer = () => {
  const { user } = useContext(AppContext);
  return (
    <footer className='footer p-4 bg-base-200 text-base-content rounded flex w-full place-content-center items-center'>
      <div className='flex flex-row align-middle justify-center place-self-center w-full max-w-7xl'>
        <div>
          <aside className='flex items-center'>
            <NavLink to={`${BASE}`}>
              <img
                src={logo}
                alt='Logo'
                width='40'
                height='40'
                className='fill-current'
                title='Motion Mate'
              />
            </NavLink>
          </aside>
        </div>
        <div className='flex-grow h-10 place-content-center text-center'>
          <p>Copyright © 2024 - All right reserved for Motion Mate</p>
        </div>
        <div>
          <nav className='flex gap-4'>
            {user && (
              <a
                href='https://github.com/A58-Agents-Team1/Motion.Mate'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  src={github}
                  alt='GitHub Logo'
                  width='40'
                  height='40'
                  className='fill-current'
                  title='GitHub Repository'
                />
              </a>
            )}
            <NavLink to={`${BASE}about`}>
              <img
                src={about}
                alt='About Us Logo'
                width='40'
                height='40'
                className='fill-current'
                title='About Us'
              />
            </NavLink>
            <NavLink to={`${BASE}contact-us`}>
              <img
                src={contact}
                alt='Contact Us Logo'
                width='40'
                height='40'
                className='fill-current'
                title='Contact Us'
              />
            </NavLink>
          </nav>
        </div>
      </div>
    </footer>
  );
};
