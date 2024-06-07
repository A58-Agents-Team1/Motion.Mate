import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

export default function NotFound() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <div className='flex flex-col items-center justify-center gap-4'>
        <img
          src={
            'https://raw.githubusercontent.com/A58-Agents-Team1/Motion.Mate/main/src/assets/logo.png'
          }
          className='w-40 h-40'
        />
        <div className='text-center leading-tight font-extrabold'>
          <h1 className='text-3xl sm:text-4xl lg:text-6xl'>
            <span>Error 404</span>
            <br />
            <span className='text-red-400'>Page Not Found</span>
          </h1>
        </div>

        <div className='text-center'>
          <p className='text-lg'>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          {user ? (
            <>
              <p className='text-base mt-4'>
                Why don`t you head back to the home page and explore Motion Mate
                from there?
              </p>
              <button
                className='btn btn-primary mt-8'
                onClick={() => navigate('/')}
              >
                Home
              </button>
            </>
          ) : (
            <>
              <p className='text-base mt-4'>
                Why don`t you head back to the login page and explore Motion
                Mate from there?
              </p>
              <button
                className='btn btn-primary mt-8'
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
