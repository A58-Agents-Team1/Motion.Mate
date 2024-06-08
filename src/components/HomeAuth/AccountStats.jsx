import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { calculateTimeLeft } from '../../helper/format-date';
import { endExercise, whenTimerEnds } from '../../services/users.service';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';
import PropTypes from 'prop-types';
import { Timer } from './Timer';
import { StartWorkoutButton } from './StartWorkoutButton';

export const AccountStats = ({ timer, setStopButton, workoutTimer }) => {
  const { userData } = useContext(AppContext);
  const [currentCalories, setCurrentCalories] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [doneExercises, setDoneExercises] = useState(0);
  const [workoutTimeLeft, setWorkoutTimeLeft] = useState(null);

  useEffect(() => {
    return onValue(
      ref(db, `users/${userData.username}/updatedScores`),
      (snapshot) => {
        setCurrentCalories(snapshot?.val()?.updatedCalories);
        setDoneExercises(snapshot?.val()?.doneExercises);
      }
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft({ ...calculateTimeLeft(new Date(timer)) });
    }, 1000);

    if (timeLeft?.seconds + timeLeft?.minutes + timeLeft?.hours === -3) {
      const updateCalories = async () => {
        await whenTimerEnds(userData.username);
        await endExercise(userData.username);
      };
      updateCalories();
      setStopButton('');
    }
    return () => clearTimeout();
  }, [timeLeft]);

  useEffect(() => {
    setTimeout(() => {
      setWorkoutTimeLeft({ ...calculateTimeLeft(new Date(workoutTimer)) });
    }, 1000);

    return () => clearTimeout();
  }, [workoutTimeLeft]);

  return (
    <div className='flex flex-col items-center w-full mb-5'>
      <div className='stats shadow w-full max-w-4xl flex items-start '>
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
          <div className='stat-value text-secondary'>{doneExercises || 0}</div>
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
          <Timer timeLeft={timeLeft} />
          <div className='stat-desc text-secondary'>
            Track the exercise duration
          </div>
        </div>
        <div className='stat gap-2'>
          <div className='stat-figure text-secondary'>
            <div className='avatar online'></div>
          </div>
          <div className='stat-title'>Calories burned</div>
          <div className='stat-value text-secondary'>
            {currentCalories || 0}
          </div>
          <div className='stat-desc text-secondary'>Challenge yourself</div>
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
          <div className='stat-title'>Start your workout</div>
          <Timer timeLeft={workoutTimeLeft} />
          <StartWorkoutButton />
        </div>
      </div>
    </div>
  );
};

AccountStats.propTypes = {
  timer: PropTypes.number,
  setStopButton: PropTypes.func,
  workoutTimer: PropTypes.number,
};
