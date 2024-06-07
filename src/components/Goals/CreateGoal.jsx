import { useContext, useState } from 'react';
import { createGoal } from '../../services/goal.service';
import { AppContext } from '../../context/AppContext';
import { validateGoalForm } from '../../common/goal.validations';
import {
  APP_NAME,
  GOAL_MAX_CALORIES,
  GOAL_MAX_EXERCISES,
  GOAL_MAX_PROGRESS,
  GOAL_MIN_CALORIES,
  GOAL_MIN_EXERCISES,
  GOAL_MIN_PROGRESS,
} from '../../common/constants';
import AlertSuccess from '../Alerts/AlertSuccess';
import AlertError from '../Alerts/AlertError';
import { alertHelper } from '../../helper/alert-helper';

export default function CreateGoal() {
  document.querySelector('title').textContent = `${APP_NAME} | Create Goal`;

  const { userData } = useContext(AppContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setAlertMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    name: '',
    from: '',
    to: '',
    type: 'manual',
    exercises: GOAL_MIN_EXERCISES,
    calories: GOAL_MIN_CALORIES,
    progress: GOAL_MIN_PROGRESS,
  });

  const updateForm = (props) => (e) => {
    setForm((form) => ({
      ...form,
      [props]: e.target.value,
    }));
  };

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    try {
      validateGoalForm(
        form.name,
        userData?.username,
        new Date(form.from).getTime(),
        new Date(form.to).getTime()
      );

      await createGoal(
        form.name,
        userData.username,
        new Date(form.from).getTime(),
        new Date(form.to).getTime(),
        form.type,
        Number(form.exercises),
        Number(form.progress),
        Number(form.calories)
      );
      setForm({
        name: '',
        from: '',
        to: '',
        type: 'manual',
        exercises: GOAL_MIN_EXERCISES,
        calories: GOAL_MIN_CALORIES,
        progress: GOAL_MIN_PROGRESS,
      });

      document.getElementById('my_modal_3').close();
      alertHelper(setAlertMessage, setShowSuccess, 'Goal Created!');
    } catch (error) {
      alertHelper(setAlertMessage, setShowError, error.message);
    }
  };

  return (
    <>
      <button
        className='btn btn-primary self-center w-1/2'
        onClick={() => document.getElementById('my_modal_3').showModal()}
      >
        Create Goal
      </button>
      <dialog
        id='my_modal_3'
        className='modal '
      >
        <div className='modal-box py-16'>
          <form method='dialog'>
            <button
              type='button'
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={() => {
                document.getElementById('my_modal_3').close(),
                  setForm({
                    name: '',
                    from: '',
                    to: '',
                  });
              }}
            >
              ✕
            </button>
          </form>
          <div className='form-control gap-3'>
            <label className='input input-bordered flex items-center gap-2 shadow-xl'>
              Name
              <input
                type='text'
                className='grow'
                placeholder='Goal Name'
                value={form.name}
                onChange={updateForm('name')}
              />
            </label>
            <div className='join join-vertical shadow-xl'>
              <label className='input input-bordered flex items-center gap-2'>
                From
                <input
                  type='datetime-local'
                  className='w-full'
                  value={form.from}
                  onChange={updateForm('from')}
                />
              </label>

              <label className='input input-bordered flex items-center gap-2'>
                To
                <input
                  type='datetime-local'
                  className='w-full'
                  value={form.to}
                  onChange={updateForm('to')}
                />
              </label>
            </div>

            <label className='label self-center '>Goal Type</label>
            <div className='flex w-full'>
              <div className='grid h-20 flex-grow card bg-base-300 rounded-box place-items-center shadow-2xl'>
                <div className='form-control'>
                  <label className='label cursor-pointer gap-1'>
                    <span className='label-text'>Exercises</span>
                    <input
                      type='radio'
                      name='radio-10'
                      className='radio checked:bg-blue-500'
                      onChange={() => setForm({ ...form, type: 'exercises' })}
                      checked={form.type === 'exercises' ? true : false}
                    />
                  </label>
                </div>
              </div>
              <div className='divider divider-horizontal'>OR</div>
              <div className='grid h-20 flex-grow card bg-base-300 rounded-box place-items-center shadow-2xl'>
                <div className='form-control'>
                  <label className='label cursor-pointer gap-1'>
                    <span className='label-text'>Manual progress</span>
                    <input
                      type='radio'
                      name='radio-10'
                      className='radio checked:bg-blue-500'
                      onChange={() => setForm({ ...form, type: 'manual' })}
                      checked={form.type === 'manual' ? true : false}
                    />
                  </label>
                </div>
              </div>
              <div className='divider divider-horizontal'>OR</div>
              <div className='grid h-20 flex-grow card bg-base-300 rounded-box place-items-center shadow-2xl'>
                <div className='form-control'>
                  <label className='label cursor-pointer gap-1'>
                    <span className='label-text'>Calories</span>
                    <input
                      type='radio'
                      name='radio-10'
                      className='radio checked:bg-blue-500'
                      onChange={() => setForm({ ...form, type: 'calories' })}
                      checked={form.type === 'calories' ? true : false}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className='mt-2 shadow-xl'>
              {form.type === 'exercises' && (
                <label className='input input-bordered flex items-center gap-2'>
                  Exercises
                  <input
                    type='number'
                    className='grow'
                    placeholder='Exercises'
                    value={form.exercises}
                    min={GOAL_MIN_EXERCISES}
                    max={GOAL_MAX_EXERCISES}
                    onChange={updateForm('exercises')}
                    checked={form.type === 'exercises' ? true : false}
                  />
                </label>
              )}
              {form.type === 'manual' && (
                <label className='input input-bordered flex items-center gap-2'>
                  Progress {form.progress}%
                  <input
                    type='range'
                    className='grow'
                    placeholder='Progress'
                    min={GOAL_MIN_PROGRESS}
                    max={GOAL_MAX_PROGRESS}
                    value={form.progress}
                    onChange={updateForm('progress')}
                    checked={form.type === 'manual' ? true : false}
                  />
                </label>
              )}
              {form.type === 'calories' && (
                <label className='input input-bordered flex items-center gap-2'>
                  Calories
                  <input
                    type='number'
                    className='grow'
                    placeholder='Calories'
                    min={GOAL_MIN_CALORIES}
                    max={GOAL_MAX_CALORIES}
                    value={form.calories}
                    onChange={updateForm('calories')}
                    checked={form.type === 'calories' ? true : false}
                  />
                </label>
              )}
            </div>
          </div>
          <button
            type='button'
            className='btn btn-sm btn-ghost absolute right-2 bottom-2'
            onClick={handleCreateGoal}
          >
            Create
          </button>
        </div>
        {showError && <AlertError message={`${errorMessage}!`} />}
      </dialog>
      {showSuccess && <AlertSuccess message='Goal Created!' />}
    </>
  );
}
