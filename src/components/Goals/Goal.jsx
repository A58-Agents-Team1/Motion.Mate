import { useContext, useEffect, useState } from 'react';
import { getUserByUsername } from '../../services/users.service';
import GoalButton from './GoalButton';
import PropTypes from 'prop-types';
import { calculateTimeLeft } from '../../helper/format-date';
import { AppContext } from '../../context/AppContext';
import { deleteGoal } from '../../services/goal.service';
import { useNavigate } from 'react-router-dom';
import AlertSuccess from '../Alerts/AlertSuccess';
import AlertError from '../Alerts/AlertError';
import { alertHelper } from '../../helper/alert-helper';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

export default function Goal({ id, owner, name, from, to, progress }) {
  const navigation = useNavigate();
  const { userData } = useContext(AppContext);
  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const [showDeleted, setShowDeleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [ownerObj, setOwnerObj] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleDetailsClick = () => {
    navigation(`/goals/${(userData?.username, id)}`);
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
      <td>{name}</td>

      <td>
        {timeLeft?.days +
          timeLeft?.hours +
          timeLeft?.minutes +
          timeLeft?.seconds >
        0 ? (
          <div className='grid grid-flow-col gap-5 text-center auto-cols-max'>
            <div className='flex flex-col'>
              <span className='countdown font-mono text-xl'>
                <span style={{ '--value': timeLeft?.days }}></span>
              </span>
              days
            </div>
            <div className='flex flex-col'>
              <span className='countdown font-mono text-xl'>
                <span style={{ '--value': timeLeft?.hours }}></span>
              </span>
              hours
            </div>
            <div className='flex flex-col'>
              <span className='countdown font-mono text-xl'>
                <span style={{ '--value': timeLeft?.minutes }}></span>
              </span>
              min
            </div>
            <div className='flex flex-col'>
              <span className='countdown font-mono text-xl'>
                <span style={{ '--value': timeLeft?.seconds }}></span>
              </span>
              sec
            </div>
          </div>
        ) : timeLeft !== null ? (
          <div className='flex flex-col text-center'>
            <div className='font-mono text-xl'>
              <div className='text-red-500 '>
                {progress < 100 && 'Just do it!'}
                {progress === 100 && 'Congratulations!'}
              </div>
              <div className='flex gap-1 align-middle justify-center text-center text-red-500 w-full'>
                {progress < 100 && 'But next time'}
                {progress < 100 && (
                  <FontAwesomeIcon
                    beat
                    icon={faCheck}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-row gap-2.5 w-48'>
            <div className='flex flex-col gap-1'>
              <div className='skeleton h-9 w-9'></div>
              <div className='skeleton h-4 w-9'></div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='skeleton h-9 w-9'></div>
              <div className='skeleton h-4 w-9'></div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='skeleton h-9 w-9'></div>
              <div className='skeleton h-4 w-9'></div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='skeleton h-9 w-9'></div>
              <div className='skeleton h-4 w-9'></div>
            </div>
          </div>
        )}
      </td>
      <td>
        <div
          className={`radial-progress 
          ${
            progress < 25
              ? 'bg-red-500/45'
              : progress >= 25 && progress < 50
              ? 'bg-yellow-400/45'
              : progress >= 50 && progress < 75
              ? 'bg-yellow-500/45'
              : progress >= 75 && progress < 100
              ? 'bg-green-300/45'
              : 'bg-green-400/45'
          }`}
          style={{ '--value': progress }}
          role='progressbar'
        >
          {progress}
        </div>
      </td>
      <td>
        <GoalButton
          primary={false}
          title={'Details'}
          styles='btn-primary mx-2'
          onClick={handleDetailsClick}
        />
        {(userData?.username === owner || userData?.userRole === 'admin') && (
          <GoalButton
            primary={false}
            styles='btn-warning'
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
};
