import { FriendAvatar } from '../Exercise/FriendAvatar';
import InfoBite from '../Exercise/InfoBite';

export const FinishedGoal = ({ goal, userData }) => {
  return (
    <>
      <div className='mb-2'>
        <div className='avatar flex items-center mb-3'>
          <div className='w-12 mr-3 rounded-full border-2 border-primary'>
            <FriendAvatar username={userData?.username} />
          </div>

          <div className='username !aspect-auto'>
            <small className='block text-xs'>Created By</small>
            <strong>{userData.username}</strong>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <div>
            <small className='block text-xs'>Goal</small>
            <h3 className='card-title text-lg font-bold '>{goal?.name}</h3>
          </div>

          <div>
            <small className='block text-xs'>Duration</small>

            <strong className='text-primary'>{`from: ${goal?.timePeriod?.from} : to: ${goal?.timePeriod?.to}`}</strong>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-2 '>
        <InfoBite
          isBlock
          title={'Calories'}
          content={goal.calories + ' kcal'}
        />
      </div>
    </>
  );
};
