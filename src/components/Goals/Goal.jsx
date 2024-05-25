import { useEffect, useState } from 'react';
import { getUserByUsername } from '../../services/users.service';
import GoalButton from './GoalButton';
import PropTypes from 'prop-types';
import { fullFormatDate } from '../../helper/format-date';
export default function Goal({ owner, name, from, to, status, progress }) {
  const [ownerObj, setOwnerObj] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const goalOwner = async () => {
      try {
        const res = await getUserByUsername(owner);
        setOwnerObj(res.val());
      } catch (error) {
        console.error('Error fetching goal owner:', error.message);
      }
    };
    goalOwner();
  }, [owner]);

  return (
    <>
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
      <td>{fullFormatDate(from)}</td>
      <td>{fullFormatDate(to)}</td>
      <td>
        <div
          className='radial-progress'
          style={{ '--value': progress }}
          role='progressbar'
        >
          {progress}
        </div>
      </td>
      <td>{status}</td>
      <th className='join join-vertical gap-3'>
        <GoalButton title={'Add Goal'} />
        <GoalButton
          primary={false}
          title={'Details'}
        />
      </th>
    </>
  );
}

Goal.propTypes = {
  owner: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  from: PropTypes.any.isRequired,
  to: PropTypes.any.isRequired,
  status: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
};
