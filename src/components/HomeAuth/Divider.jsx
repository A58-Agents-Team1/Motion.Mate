import { useContext, useEffect, useState } from 'react';
import AlertError from '../Alerts/AlertError';
import AlertSuccess from '../Alerts/AlertSuccess';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { AppContext } from '../../context/AppContext';
import {
  endExercise,
  getFriends,
  startExercise,
  stopTimerRemoveCalories,
} from '../../services/users.service';
import { ExerciseCard } from '../Exercise/ExerciseCard';
import { RemoveFromListButton } from '../Exercise/RemoveFromListButton';
import { handleOnStart } from '../../helper/exercise-timer';
import { FinishedGoal } from './FinishedGoal';
import PropTypes from 'prop-types';

export const Divider = ({ stopButton }) => {
  const { userData } = useContext(AppContext);
  const [inProgress, setInProgress] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [friends, setFriends] = useState();

  useEffect(() => {
    return onValue(ref(db, 'exercises'), (snapshot) => {
      try {
        const exercises = snapshot.val();
        const allExercises = [];

        Object.entries(exercises).map(([id, exercise]) => {
          Object.entries(exercise).map(([exerciseId, exerciseData]) => {
            allExercises.push({ id: exerciseId, ...exerciseData });
          });
        });

        const filtered = allExercises.filter((obj) => obj.inProgress === true);
        setInProgress(filtered);

        const fetchFriends = async () => {
          const snapshot = await getFriends(userData?.username);
          if (snapshot) {
            setFriends(snapshot);
          }
        };
        fetchFriends();
      } catch (error) {
        throw new Error(error.message);
      }
    });
  }, [userData?.username]);

  const stopTimer = async (exercise) => {
    await endExercise(userData.username);
    await stopTimerRemoveCalories(userData.username, exercise.calories);
  };

  return (
    <div>
      {inProgress.length ? (
        <div className='flex flex-col lg:flex-row'>
          <div className='flex-1'>
            {inProgress.map((exercise) => (
              <div
                key={exercise.id}
                className='flex flex-col items-center'
              >
                {(exercise.createdBy === userData.username ||
                  friends?.includes(exercise.createdBy)) && (
                  <div className='card w-96 bg-base-300 m-2'>
                    <div className='card-body p-4'>
                      <ExerciseCard
                        exercise={exercise}
                        userData={userData}
                      />
                      <div className='card-actions mt-2 justify-end'>
                        <RemoveFromListButton
                          exercise={exercise}
                          category={exercise.categoryName}
                          setAlertMessage={setAlertMessage}
                          setShowSuccess={setShowSuccess}
                          setShowError={setShowError}
                        />

                        {stopButton === exercise.id ? (
                          <button
                            className='btn btn-primary'
                            onClick={() => stopTimer(exercise)}
                          >
                            Stop
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleOnStart(exercise, startExercise, userData);
                            }}
                            className='btn btn-secondary'
                          >
                            Start
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className='divider lg:divider-horizontal my-auto'>OR</div>
          <div className='flex-1 flex flex-col items-center'>
            <FinishedGoal></FinishedGoal>
          </div>
        </div>
      ) : (
        <div className='flex text-center flex-col'>
          <h1 className='text-2xl font-bold mb-4'>No exercises in list </h1>
          <h1 className='text-2xl font-bold mb-4'>
            This is the place where you can start multiple workouts and track
            burned calories. <br />
            You can also add friends so you can share workouts!
          </h1>
        </div>
      )}
      {showError && <AlertError message={alertMessage} />}
      {showSuccess && <AlertSuccess message={alertMessage} />}
    </div>
  );
};

Divider.propTypes = {
  stopButton: PropTypes.string,
};
