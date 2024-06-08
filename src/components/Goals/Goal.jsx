import { useContext, useEffect, useState } from 'react';
import { getUserByUsername } from '../../services/users.service';
import GoalButton from './GoalButton';
import PropTypes from 'prop-types';
import { calculateTimeLeft } from '../../helper/format-date';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import AlertError from '../Alerts/AlertError';
import { alertHelper } from '../../helper/alert-helper';
import TimeLeft from './TimeLeft';
import Progress from './Progress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import AlertSuccess from '../Alerts/AlertSuccess';
import { deleteGoal } from '../../services/goal.service';

export default function Goal({ id, owner, name, from, to, progress, type }) {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const [showError, setShowError] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [ownerObj, setOwnerObj] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleDetailsClick = () => {
    navigate(`/goals/${(userData?.username, id)}`);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteGoal(userData?.username, id);
      alertHelper(setShowMessage, setShowDeleted, 'Goal deleted successfully!');
    } catch (error) {
      alertHelper(setShowMessage, setShowError, error.message);
    }
  };

  useEffect(() => {
    const goalOwner = async () => {
      try {
        const res = await getUserByUsername(owner);
        setOwnerObj(res.val());
      } catch (error) {
        alertHelper(setShowMessage, setShowError, error.message);
      }
    };

    goalOwner();
  }, [owner]);

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft({ ...calculateTimeLeft(new Date(to)) });
    }, 1000);
    return () => clearTimeout();
  }, [timeLeft]);

  return (
    <>
      <th>
        <div className={'flex items-center gap-3'}>
          <div className='avatar'>
            <div className='mask mask-squircle w-12 h-12'>
              <img
                src={ownerObj?.avatar || '/img/avatars/avatar-1.jpg'}
                alt={`Avatar of ${ownerObj?.firstName} ${ownerObj?.lastName}`}
              />
            </div>
          </div>
          <div>
            <div className='font-bold'>
              {ownerObj?.firstName} {ownerObj?.lastName}
            </div>
            <div className='text-sm opacity-50'>{ownerObj?.email}</div>
          </div>
        </div>
      </th>
      <td className='first-letter:uppercase'>{type}</td>
      <td>{name}</td>

      <td>
        <TimeLeft goal={{ name, owner, progress, timePeriod: { from, to } }} />
      </td>
      {type && (
        <td>
          <Progress progress={progress} />
        </td>
      )}
      <td className='flex items-center h-28'>
        {userData?.username === owner && (
          <GoalButton
            primary={false}
            title={'Details'}
            styles='btn-primary mx-2'
            onClick={handleDetailsClick}
          />
        )}
        {(userData?.username === owner || userData?.userRole === 'admin') && (
          <GoalButton
            primary={false}
            styles='btn-warning '
            onClick={handleDeleteClick}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </GoalButton>
        )}
        {showDeleted && <AlertSuccess message={showMessage} />}
        {showError && <AlertError message={showMessage} />}
      </td>
    </>
  );
}

Goal.propTypes = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  from: PropTypes.any.isRequired,
  to: PropTypes.any.isRequired,
  progress: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
