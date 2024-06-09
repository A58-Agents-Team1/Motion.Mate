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
import PropTypes from 'prop-types';
import { RemoveFromListButton } from '../Exercise/RemoveFromListButton';
import { handleOnStart } from '../../helper/exercise-timer';
import { updateGoalProgressCalories } from '../../helper/update-goals-progress';

export const Divider = ({ stopButton }) => {
  const [inProgress, setInProgress] = useState([]);
  const [showError, setShowError] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { userData } = useContext(AppContext);
  const [friends, setFriends] = useState();
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    return onValue(ref(db, 'exercises'), (snapshot) => {
      const exercises = snapshot.val();
      const allExercises = [];

      Object.entries(exercises).forEach(([id, exercise]) => {
        Object.entries(exercise).forEach(([exerciseId, exerciseData]) => {
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
    });
  }, [userData?.username]);

  useEffect(() => {
    return onValue(
      ref(db, `users/${userData.username}/myGoals`),
      (snapshot) => {
        // Object.values(snapshot.val()).filter((goal) => {
        //   if (goal?.isDone) {
        //     setShowModal(true);
        //   }
        // });
        updateGoalProgressCalories(userData.username);
      }
    );
  }, []);

  const stopTimer = async (exercise) => {
    await endExercise(userData.username);
    await stopTimerRemoveCalories(userData.username, exercise.calories);
  };

  return (
    <div>
      {inProgress.length ? (
        <div className='flex flex-col lg:flex-row'>
          <div className='flex-1 flex flex-wrap'>
            {inProgress.map((exercise) => (
              <div key={exercise.id}>
                {(exercise.createdBy === userData.username ||
                  friends?.includes(exercise.createdBy)) && (
                  <div className='card w-96 bg-base-300 mb-4'>
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
                        {/* <div>
                          {showModal &&
                            document.getElementById('goal_modal').showModal()}
                          <dialog
                            id='goal_modal'
                            className='modal'
                          >
                            <div className='modal-box max-w-2xl skeleton'>
                              <h3 className='font-bold text-lg'>
                                Congratulations!
                              </h3>
                              <p>You have achieved a goal!</p>
                              <form method='dialog'>
                                <button
                                  onClick={() => setShowModal(false)}
                                  className='btn'
                                >
                                  Close
                                </button>
                              </form>
                            </div>
                          </dialog>
                        </div> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className='divider lg:divider-horizontal my-auto'>OR</div>
          <div className='flex-1 grid h-32  place-items-center'>
            <div className='card w-96 bg-base-100'>
              <div className='card-body shadow-2xl mb-7'>
                <h2 className='card-title'>Goals</h2>
                <p>Here are your reached goals</p>
                <div className='card-actions justify-end'></div>
              </div>
            </div>
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
