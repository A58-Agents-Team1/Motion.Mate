import { useContext, useState } from 'react';
import {
  StartTimerWorkout,
  stopTimerWorkout,
} from '../../services/users.service';
import { AppContext } from '../../context/AppContext';
import { workoutTimer } from '../../helper/workout-timer';
import PropTypes from 'prop-types';

export const StartWorkoutButton = ({ startWorkout }) => {
  const { userData } = useContext(AppContext);
  const [content, setContent] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const updateContent = (e, prop) => {
    setContent({
      ...content,
      [prop]: e,
    });
  };

  const endTimer = async () => {
    await stopTimerWorkout(userData.username);
  };

  return (
    <div className='stat-desc text-secondary'>
      {!startWorkout ? (
        <div>
          <button
            className='btn btn-secondary'
            onClick={() => document.getElementById('my_modal_1').showModal()}
          >
            Start workout
          </button>
        </div>
      ) : (
        <div>
          <button
            className='btn btn-secondary'
            onClick={endTimer}
          >
            End workout
          </button>
        </div>
      )}

      <dialog
        id='my_modal_1'
        className='modal'
      >
        <div className='modal-box max-w-2xl skeleton'>
          <h3 className='font-bold text-lg'>Hello!</h3>
          <div className='flex gap-2'>
            <label className='input input-bordered w-1/3 flex items-center mb-3 select-secondary'>
              <input
                onChange={(e) => updateContent(e.target.value, 'hours')}
                type='number'
                className='grow'
                placeholder='Hours'
                value={content.hours}
              />
            </label>

            <label className='input input-bordered w-1/3 flex items-center mb-3 select-secondary'>
              <input
                onChange={(e) => updateContent(e.target.value, 'minutes')}
                type='number'
                className='grow'
                placeholder='Minutes'
                value={content.minutes}
              />
            </label>

            <label className='input input-bordered w-1/3 flex items-center mb-3 select-secondary'>
              <input
                onChange={(e) => updateContent(e.target.value, 'seconds')}
                type='number'
                className='grow'
                placeholder='Seconds'
                value={content.seconds}
              />
            </label>
          </div>
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn'>Cancel</button>
              <button
                onClick={() =>
                  workoutTimer(content, userData, setContent, StartTimerWorkout)
                }
                className='btn'
              >
                Start
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

StartWorkoutButton.propTypes = {
  startWorkout: PropTypes.bool,
};
