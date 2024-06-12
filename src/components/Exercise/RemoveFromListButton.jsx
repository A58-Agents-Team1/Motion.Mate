import { alertHelper } from '../../helper/alert-helper';
import { handleRemoveFromList } from '../../helper/exercise-control';
import { removeExerciseInProgress } from '../../services/exercise.service';
import PropTypes from 'prop-types';

export const RemoveFromListButton = ({
  exercise,
  category,
  setAlertMessage,
  setShowSuccess,
  setShowError,
}) => {
  return (
    <button
      onClick={() =>
        handleRemoveFromList(
          removeExerciseInProgress,
          category,
          exercise.id,
          setAlertMessage,
          setShowSuccess,
          setShowError,
          alertHelper,
          'Exercise removed from list!'
        )
      }
      className='btn btn-outline btn-primary'
    >
      Remove from list
    </button>
  );
};

RemoveFromListButton.propTypes = {
  exercise: PropTypes.object,
  category: PropTypes.string,
  setAlertMessage: PropTypes.func,
  setShowSuccess: PropTypes.func,
  setShowError: PropTypes.func,
};
