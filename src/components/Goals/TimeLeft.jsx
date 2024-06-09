import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { calculateTimeLeft } from '../../helper/format-date';

const TimeLeft = ({ goal }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft({ ...calculateTimeLeft(new Date(goal?.timePeriod?.to)) });
    }, 1000);
    return () => clearTimeout();
  }, [timeLeft, goal?.timePeriod?.to]);

  return (
    <>
      {timeLeft?.days +
        timeLeft?.hours +
        timeLeft?.minutes +
        timeLeft?.seconds >
        0 && goal?.progress < 100 ? (
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
            <div className='text-green-500 '>
              {goal?.progress < 100 && 'Just do it!'}
              {goal?.progress === 100 && 'Goal Completed!'}
            </div>
            <div className='flex gap-1 align-middle justify-center text-center text-red-500 w-full'>
              {goal?.progress < 100 && 'But next time'}
              {goal?.progress < 100 && (
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
    </>
  );
};

TimeLeft.propTypes = {
  goal: PropTypes.object,
};

export default TimeLeft;
