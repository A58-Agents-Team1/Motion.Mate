import { useContext, useEffect, useState } from 'react';
import { removeExerciseInProgress } from '../../services/exercise.service';
import { handleRemoveFromList } from '../../helper/exercise-control';
import { alertHelper } from '../../helper/alert-helper';
import AlertError from '../Alerts/AlertError';
import AlertSuccess from '../Alerts/AlertSuccess';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { AppContext } from '../../context/AppContext';
import { getFriends } from '../../services/users.service';
import { ExerciseCard } from '../Exercise/ExerciseCard';

export const Divider = ({ timer, setTimer, setStartTimer }) => {
  const [inProgress, setInProgress] = useState([]);
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [handleTimer, setHandleTimer] = useState(false);
  const [showError, setShowError] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [stopButton, setStopButton] = useState('');
  const { userData } = useContext(AppContext);
  const [friends, setFriends] = useState();

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

  const getDuration = (exercise) => {
    const hours = Number(exercise.duration.hours);
    const minutes = Number(exercise.duration.minutes);
    const seconds = Number(exercise.duration.seconds);
    setDuration({ hours, minutes, seconds });
    setHandleTimer(true);
    setStopButton(exercise.id);
  };

  const stopTimer = () => {
    setTimer(0);
    setHandleTimer(false);
    setStopButton('');
  };

  useEffect(() => {
    setTimer(duration.hours * 3600 + duration.minutes * 60 + duration.seconds);
    setStartTimer(true);
  }, [duration]);

  return (
    <div>
      {inProgress.length > 0 ? (
        <div className='flex flex-col w-full lg:flex-row'>
          <div className='card w-96 bg-base-300 '>
            {inProgress.map((exercise) => (
              <div key={exercise.id}>
                {(exercise.createdBy === userData.username ||
                  friends?.includes(exercise.createdBy)) && (
                  <div className='card-body '>
                    <ExerciseCard exercise={exercise} userData={userData} />
                    <div className='card-actions justify-end'>
                      {stopButton === exercise.id ? (
                        <button onClick={stopTimer}>Stop</button>
                      ) : (
                        <button
                          onClick={() => {
                            getDuration(exercise);
                          }}
                          className='btn btn-secondary'
                        >
                          Start
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleRemoveFromList(
                            removeExerciseInProgress,
                            exercise.categoryName,
                            exercise.id,
                            setAlertMessage,
                            setShowSuccess,
                            setShowError,
                            alertHelper,
                            'Exercise removed from list!'
                          )
                        }
                        className='btn btn-primary'
                      >
                        Remove from list
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className='divider lg:divider-horizontal'>OR</div>
          <div className='grid flex-grow h-32 card bg-base-300 rounded-box place-items-center'>
            <div className='card w-96 bg-base-100 '>
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
