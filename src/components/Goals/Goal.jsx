import { useContext, useEffect, useState } from 'react';
import { getUserByUsername } from '../../services/users.service';
import GoalButton from './GoalButton';
import PropTypes from 'prop-types';
import { shortFormatDate } from '../../helper/format-date';
import { AppContext } from '../../context/AppContext';
import { deleteGoal } from '../../services/goal.service';
import { useNavigate } from 'react-router-dom';
import AlertSuccess from '../Alerts/AlertSuccess';
import AlertError from '../Alerts/AlertError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

export default function Goal({ id, owner, name, from, to, progress }) {
  const navigation = useNavigate();
  const { userData } = useContext(AppContext);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const errorMessages = (message) => {
    setShowError(true);
    setShowErrorMessage(message);
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  const [ownerObj, setOwnerObj] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleDetailsClick = async () => {
    navigation(`/goals/${id}`);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteGoal(id);
      setShowDeleted(true);
      setTimeout(() => {
        setShowDeleted(false);
      }, 3000);
    } catch (error) {
      errorMessages(error.message);
    }
  };

  useEffect(() => {
    const goalOwner = async () => {
      try {
        const res = await getUserByUsername(owner);
        setOwnerObj(res.val());
      } catch (error) {
        errorMessages(error.message);
      }
    };
    goalOwner();
  }, [owner]);

  return (
    <>
      {showDeleted && <AlertSuccess message='Goal deleted successfully!' />}
      {showError && <AlertError message={showErrorMessage} />}
      <th>
        <div className='flex items-center gap-3'>
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
      <td>{shortFormatDate(from)}</td>
      <td>{shortFormatDate(to)}</td>
      <td>
        <div
          className='radial-progress'
          style={{ '--value': progress }}
          role='progressbar'
        >
          {progress}
        </div>
      </td>
      <td className=' box border border-red-500'>
        <GoalButton
          primary={false}
          title={'Details'}
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
