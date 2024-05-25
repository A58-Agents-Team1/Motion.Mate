import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/users.service';

export default function Home() {
  const [all, setAll] = useState([]);

  useEffect(() => {
    const allUsers = async () => {
      const result = await getAllUsers();
      const users = result.val();
      setAll(Object.keys(users).length);
    };
    allUsers();
  }, []);

  return (
    <div className='flex flex-col'>
      <div className=' bg-base-200'>
        <div className='hero-content flex-col lg:flex-row'>
          <img
            src='https://i.pinimg.com/564x/34/28/86/34288601de8af9fe8aaa9d11c4a56db1.jpg'
            className='max-w-sm rounded-lg shadow-2xl'
          />
          <div>
            <h1 className='text-5xl font-bold'>Ready to join the lifestyle?</h1>
            <p className='py-6'>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className='btn btn-primary'>Get Started</button>
          </div>
        </div>
      </div>
      <div className='max-w-fit'>
        <div className='stats shadow flex-1'>
          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block w-8 h-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </div>
            <div className='stat-title'>Downloads</div>
            <div className='stat-value'>31K</div>
            <div className='stat-desc'>Jan 1st - Feb 1st</div>
          </div>

          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block w-8 h-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                ></path>
              </svg>
            </div>
            <div className='stat-title'>All Users</div>
            <div className='stat-value'>{all}</div>
            <div className='stat-desc'>
              ↗︎ What are you waiting for - join us!
            </div>
          </div>

          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block w-8 h-8 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
                ></path>
              </svg>
            </div>
            <div className='stat-title'>New Registers</div>
            <div className='stat-value'>1,200</div>
            <div className='stat-desc'>↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
