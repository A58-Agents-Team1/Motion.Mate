import { useContext, useState } from 'react';
import { createGoal } from '../../services/goal.service';
import { AppContext } from '../../context/AppContext';
import { validateGoalForm } from '../../common/goal.validations';
import { APP_NAME } from '../../common/constants';

export default function CreateGoal() {
  document.querySelector('title').textContent = `${APP_NAME} | Create Goal`;

  const { userData } = useContext(AppContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    from: '',
    to: '',
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
        new Date(form.to).getTime(),
        setShowError
      );
      await createGoal(
        form.name,
        userData.username,
        new Date(form.from).getTime(),
        new Date(form.to).getTime()
      );
      setForm({
        name: '',
        from: '',
        to: '',
      });

      document.getElementById('my_modal_3').close();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.message);
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
            <label className='input input-bordered flex items-center gap-2'>
              Name
              <input
                type='text'
                className='grow'
                placeholder='Goal Name'
                value={form.name}
                onChange={updateForm('name')}
              />
            </label>
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
          <button
            type='button'
            className='btn btn-sm btn-ghost absolute right-2 bottom-2'
            onClick={handleCreateGoal}
          >
            Create
          </button>
        </div>
        {showError && (
          <div className='toast toast-end z-999'>
            <div className='alert alert-error'>
              <span>Something went wrong!</span>
              <span>You forget about the {errorMessage}... right?!</span>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}