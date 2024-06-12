import { useContext } from 'react';
import { resetUserScores } from '../../services/users.service';
import { AppContext } from '../../context/AppContext';

export const ResetScoresButton = () => {
  const { userData } = useContext(AppContext);

  const reset = async () => {
    await resetUserScores(userData.username);
  };

  return (
    <>
      <button
        className='btn  btn-secondary'
        onClick={() => document.getElementById('reset_scores').showModal()}
      >
        Reset
      </button>
      <dialog
        id='reset_scores'
        className='modal'
      >
        <div className='modal-box skeleton'>
          <h3 className='font-bold text-lg text-secondary'>Hello!</h3>
          <p className='py-4'>
            Are you sure you want to reset all of your current scores?
          </p>
          <div className='modal-action'>
            <form method='dialog'>
              <button
                className='btn btn-primary'
                onClick={() => reset()}
              >
                Reset
              </button>
              <button className='btn btn-secondary ml-4'>Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
