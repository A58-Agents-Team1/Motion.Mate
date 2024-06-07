import { FriendAvatar } from './FriendAvatar';
import PropTypes from 'prop-types';

export const ExerciseCard = ({ exercise, userData }) => {
  return (
    <>
      <div className='flex flex-row gap-5 '>
        {exercise?.createdBy !== userData?.username && (
          <div className='avatar'>
            <div className='w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
              <FriendAvatar username={exercise?.createdBy} />
            </div>
          </div>
        )}
        <h3 className='card-title text-lg font-bold '>{exercise.title}</h3>
      </div>

      <div className='grid grid-cols-2 gap-6 '>
        <div className=''>
          <p>
            <strong className='text-primary '>Content:</strong>{' '}
            {exercise.content}
          </p>
          <p>
            <strong className='text-primary '>Calories:</strong>{' '}
            {exercise.calories}
          </p>
          <p>
            <strong className='text-primary '>Level:</strong> {exercise.level}
          </p>
          {exercise.createdBy !== userData.username && (
            <p>
              <strong className='text-primary '>Created By</strong>{' '}
              {exercise.createdBy}
            </p>
          )}
        </div>
        <div>
          <p>
            <strong className='text-primary '>Duration:</strong>
            <br />
            <strong className='text-primary '>Hours:</strong>{' '}
            {exercise.duration?.hours}
            <br />
            <strong className='text-primary '>Minutes:</strong>{' '}
            {exercise.duration?.minutes}
            <br />
            <strong className='text-primary '>Seconds:</strong>{' '}
            {exercise.duration?.seconds}
          </p>
        </div>
      </div>
    </>
  );
};

ExerciseCard.propTypes = {
  exercise: PropTypes.object,
  userData: PropTypes.object,
};
