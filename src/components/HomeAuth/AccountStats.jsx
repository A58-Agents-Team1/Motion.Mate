import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { getExercises } from '../../services/exercise.service';
import { calculateTimeLeft } from '../../helper/format-date';

export const AccountStats = ({ timer }) => {
  const [countOFExercises, setCountOfExercises] = useState([]);
  const { userData } = useContext(AppContext);
  const [doneExercise, setDoneExercise] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const count = async () => {
      const number = await getExercises();
      const data = Object.values(number);
      if (data) {
        const filtered = Object.values(data).filter((exerciseInfo) =>
          console.log(exerciseInfo)
        );
        console.log(filtered);
        setCountOfExercises(filtered);
      }
    };
    count();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft({ ...calculateTimeLeft(new Date(timer)) });
      if (timeLeft?.seconds === 1) {
        setDoneExercise((doneExercise) => doneExercise + 1);
      }
    }, 1000);
    return () => clearTimeout();
  }, [timeLeft]);

  return (
    <div className='flex flex-col items-center w-full '>
      <div className='stats shadow w-full max-w-3xl flex items-start mb-10'>
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
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              ></path>
            </svg>
          </div>
          <div className='stat-title'>Exercises done </div>
          <div className='stat-value text-secondary'>{doneExercise || 0}</div>
          <div className='stat-desc text-secondary'>Be active</div>
        </div>
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
          <div className='stat-title'>Exercises in progress</div>
          {timeLeft?.days +
            timeLeft?.hours +
            timeLeft?.minutes +
            timeLeft?.seconds >
          0 ? (
            <div>
              <span className='countdown text-secondary font-mono text-2xl mb-4'>
                <span style={{ '--value': timeLeft?.hours }}></span>:
                <span
                  style={{
                    '--value': timeLeft?.minutes,
                  }}
                ></span>
                :
                <span
                  style={{
                    '--value': timeLeft?.seconds,
                  }}
                ></span>
              </span>
            </div>
          ) : (
            <div>
              <span className='countdown text-secondary font-mono text-2xl mb-4'>
                <span style={{ '--value': 0 }}></span>:
                <span
                  style={{
                    '--value': 0,
                  }}
                ></span>
                :
                <span
                  style={{
                    '--value': 0,
                  }}
                ></span>
              </span>
            </div>
          )}

          <div className='stat-desc text-secondary'>Be active</div>
        </div>
        <div className='stat gap-2'>
          <div className='stat-figure text-secondary'>
            <div className='avatar online'></div>
          </div>
          <div className='stat-title'>Calories burned</div>
          <div className='stat-value text-secondary'>0</div>
          <div className='stat-desc text-secondary'>Challenge yourself</div>
        </div>
      </div>
    </div>
  );
};
