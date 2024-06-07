import { onValue, ref } from 'firebase/database';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import { AppContext } from '../../context/AppContext';
import { APP_NAME } from '../../common/constants';
import TimeLeft from './TimeLeft';
import GoalButton from './GoalButton';
import Progress from './Progress';
import { updateGoalProgress } from '../../services/goal.service';
import { alertHelper } from '../../helper/alert-helper';
import AlertError from '../Alerts/AlertError';

const DetailedGoal = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const { userData } = useContext(AppContext);
  const [progressSlider, setProgressSlider] = useState(0);
  const [toggleEditGoal, setToggleEditGoal] = useState(false);

  const [showMessage, setShowMessage] = useState('');
  const [showError, setShowError] = useState(false);

  document.querySelector('title').textContent = `${APP_NAME} | ${
    goal?.name || 'Detailed Goal'
  }`;

  const handleProgressChange = async (e) => {
    e.preventDefault();
    try {
      await updateGoalProgress(
        userData?.username,
        params.id,
        Number(e.target.value)
      );
    } catch (error) {
      alertHelper(setShowMessage, setShowError, error.message);
    }
  };

  useEffect(() => {
    return onValue(
      ref(db, `users/${userData?.username}/myGoals/${params.id}`),
      (snapshot) => {
        setGoal(snapshot.val());
        setProgressSlider(snapshot.val()?.progress);
      }
    );
  }, []);

  return (
    <>
      <div className='flex flex-col w-full justify-around gap-2 overflow-x-auto '>
        <div className='flex justify-around items-center'>
          <TimeLeft goal={goal} />
          {typeof goal?.progress !== 'undefined' ? (
            <Progress progress={goal?.progress} />
          ) : (
            <div className='skeleton rounded-full w-20 h-20'></div>
          )}
          {goal?.type === 'manual' ? (
            <GoalButton
              primary
              title='Edit Goal Progress'
              onClick={() => setToggleEditGoal((prev) => !prev)}
            />
          ) : (
            <div className='w-44'></div>
          )}
        </div>
        <div className='flex flex-col ring-offset-0 h-14'>
          {toggleEditGoal && (
            <>
              <input
                type='range'
                min={0}
                max={100}
                value={progressSlider}
                className='range'
                onChange={(e) => setProgressSlider(e.target.value)}
                onMouseUp={(e) => handleProgressChange(e)}
                step={1}
              />
              <div className='flex justify-between text-sm px-2'>
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </>
          )}
        </div>
        <div className={'flex items-center gap-3'}>
          <div className='avatar'>
            <div className='mask mask-squircle w-12 h-12'>
              <img
                src={userData?.avatar || '/img/avatars/avatar-1.jpg'}
                alt={`Avatar of ${userData?.firstName} ${userData?.lastName}`}
              />
            </div>
          </div>
          <div>
            <div className='font-bold'>
              {userData?.firstName} {userData?.lastName}
            </div>
            <div className='text-sm opacity-50'>{userData?.email}</div>
          </div>
        </div>

        {goal?.type === 'exercises' && (
          <GoalButton primary title='Add Exercise' />
        )}
        {goal?.type === 'calories' && (
          <GoalButton primary title='Add Exercise' />
        )}

        <GoalButton primary title='Back' onClick={() => navigate(-1)} />
      </div>
      {showError && <AlertError message={showMessage} />}
    </>
  );
};

export default DetailedGoal;
