import { useContext, useEffect, useState } from 'react';
import { getGoals } from '../../services/goal.service';
import { getUserScores } from '../../services/users.service';
import { AppContext } from '../../context/AppContext';

export const GoalModal = ({
  showModal,
  setShowModal,
  calorieGoal,
  goalName,
}) => {
  useEffect(() => {
    if (showModal) {
      const modal = document.getElementById('goal_modal');
      if (modal) {
        modal.showModal();
      }
    }
  }, [showModal]);

  return (
    <div>
      <div>
        <dialog
          id='goal_modal'
          className='modal'
        >
          <div className='modal-box max-w-2xl skeleton'>
            <h3 className='font-bold text-lg'>Congratulations!</h3>
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
      </div>
    </div>
  );
};
