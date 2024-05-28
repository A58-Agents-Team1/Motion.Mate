import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import logo from '../assets/logo.png';
import about from '../assets/about.png';
import contact from '../assets/contact.png';
import github from '../assets/github.png';

export const Footer = () => {
  const { user } = useContext(AppContext);
  return (
    <footer className='footer p-4 bg-base-200 text-base-content rounded flex justify-between items-center'>
      <div>
        <aside className='flex items-center mr-20'>
          <NavLink to='/'>
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
      <div>
        <p className='flex-grow text-center mx-4'>
          Copyright © 2024 - All right reserved for Motion Mate
        </p>
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
          <NavLink to='/about'>
            <img
              src={about}
              alt='About Us Logo'
              width='40'
              height='40'
              className='fill-current'
              title='About Us'
            />
          </NavLink>
          <NavLink to='/contact-us'>
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
    </footer>
  );
};
