import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { calculateTimeLeft } from '../../helper/format-date';
import { endExercise, whenTimerEnds } from '../../services/users.service';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { Timer } from './Timer';
import { StartWorkoutButton } from './StartWorkoutButton';
import { getGoals, updateGoalCalories } from '../../services/goal.service';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDumbbell,
  faHeartPulse,
  faPersonRunning,
  faStopwatch20,
} from '@fortawesome/free-solid-svg-icons';

export const AccountStats = ({
  timer,
  setStopButton,
  workoutTimer,
  startWorkout,
  setStartWorkout,
  calories,
}) => {
  const { userData } = useContext(AppContext);
  const [currentCalories, setCurrentCalories] = useState(0);
  const [doneExercises, setDoneExercises] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [workoutTimeLeft, setWorkoutTimeLeft] = useState(null);

  useEffect(() => {
    return onValue(
      ref(db, `users/${userData?.username}/updatedScores`),
      (snapshot) => {
        try {
          setCurrentCalories(snapshot?.val()?.updatedCalories);
          setDoneExercises(snapshot?.val()?.doneExercises);
        } catch (error) {
          throw new Error(error.message);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (timer) {
      setTimeout(() => {
        setTimeLeft({ ...calculateTimeLeft(new Date(timer)) });
      }, 1000);

      if (timeLeft?.seconds + timeLeft?.minutes + timeLeft?.hours < 1) {
        const updateCalories = async () => {
          const allGoals = await getGoals(userData.username);
          await whenTimerEnds(userData.username);
          await endExercise(userData.username);
          allGoals.map(async (goal) => {
            if (
              goal?.timePeriod?.from <= new Date() &&
              goal?.timePeriod?.to >= new Date()
            ) {
              await updateGoalCalories(
                userData.username,
                goal,
                goal?.id,
                calories
              );
            }
          });
        };
        updateCalories();
        setStopButton('');
      }
      return () => clearTimeout();
    } else {
      setTimeLeft(null);
    }
  }, [timeLeft, timer]);

  useEffect(() => {
    if (workoutTimer) {
      setTimeout(() => {
        setWorkoutTimeLeft({ ...calculateTimeLeft(new Date(workoutTimer)) });
      }, 1000);

      if (
        workoutTimeLeft?.seconds +
          workoutTimeLeft?.minutes +
          workoutTimeLeft?.hours ===
        -3
      ) {
        setWorkoutTimeLeft(null);
        setStartWorkout(false);
      }
    } else {
      setWorkoutTimeLeft(null);
      setStartWorkout(false);
      return () => clearTimeout();
    }
  }, [workoutTimeLeft, workoutTimer]);

  return (
    <div className='flex flex-col items-center w-full mb-5'>
      <div className='stats shadow w-full max-w-4xl flex items-start '>
        <div className='stat gap-2'>
          <div className='stat-figure text-secondary'>
            <FontAwesomeIcon
              icon={faDumbbell}
              size='2x'
            />
          </div>
          <div className='stat-title'>Exercises done </div>
          <div className='stat-value text-secondary'>{doneExercises || 0}</div>
          <div className='stat-desc text-secondary'>Be active</div>
        </div>
        <div className='stat gap-2'>
          <div className='stat-figure text-secondary'>
            <FontAwesomeIcon
              icon={faStopwatch20}
              size='2x'
            />
          </div>
          <div className='stat-title'>Exercises in progress</div>
          <Timer timeLeft={timeLeft} />
          <div className='stat-desc text-secondary'>
            Track the exercise duration
          </div>
        </div>
        <div className='stat gap-2'>
          <div className='stat-figure text-secondary'>
            <FontAwesomeIcon
              icon={faHeartPulse}
              size='2x'
            />
          </div>
          <div className='stat-title'>Calories burned</div>
          <div className='stat-value text-secondary'>
            {currentCalories || 0}
          </div>
          <div className='stat-desc text-secondary'>Challenge yourself</div>
        </div>
        <div className='stat gap-2'>
          <div className='stat-figure text-secondary'>
            <FontAwesomeIcon
              icon={faPersonRunning}
              size='2x'
            />
          </div>
          <div className='stat-title'>Start your workout</div>
          <Timer timeLeft={workoutTimeLeft} />
          <StartWorkoutButton startWorkout={startWorkout} />
        </div>
      </div>
    </div>
  );
};

AccountStats.propTypes = {
  timer: PropTypes.number,
  setStopButton: PropTypes.func,
  workoutTimer: PropTypes.number,
  startWorkout: PropTypes.bool,
  setStartWorkout: PropTypes.func,
  calories: PropTypes.number,
};
