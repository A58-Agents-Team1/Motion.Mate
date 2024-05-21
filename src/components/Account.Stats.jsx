import { useContext, useState } from 'react';
import { CreateExercise } from './CreateExercise';
import { getExercisesByUsername } from '../services/exercise.service';
import { AppContext } from '../context/AppContext';

export const AccountStats = () => {
  const [count, setCount] = useState(0);
  const { userData } = useContext(AppContext);

  const countOFExercises = async () => {
    const number = await getExercisesByUsername(userData?.username);
    // console.log(number);
    setCount(number.length);
    // console.log(count);
  };
  countOFExercises();

  return (
    <div className='stats shadow'>
      <div className='stat gap-2'>
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
              d='M13 10V3L4 14h7v7l9-11h-7z'
            ></path>
          </svg>
        </div>
        <div className='stat-title'>Exercises done</div>
        <div className='stat-value text-secondary'>0</div>
        <div className='stat-desc'>Be active - be happy</div>
      </div>

      <div className='stat gap-2'>
        <div className='stat-figure text-secondary'>
          <div className='avatar online'></div>
        </div>
        <div className='stat-title'>Goals reached</div>

        <div className='stat-value'>0</div>
        <button className='btn btn-outline btn-secondary '>Set Goals</button>
        <div className='stat-desc text-secondary'>Challenge yourself</div>
      </div>
      <div className='stat gap-2'>
        <div className='stat-figure text-primary'>
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
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            ></path>
          </svg>
        </div>
        <div className='stat-title'>My exercises</div>
        <div className='stat-value text-primary'>{count}</div>
        <CreateExercise />
        <div className='stat-desc text-primary'>Be active</div>
      </div>
    </div>
  );
};
