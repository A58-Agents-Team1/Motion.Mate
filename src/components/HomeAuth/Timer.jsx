import PropTypes from 'prop-types';

export const Timer = ({ timeLeft }) => {
  return (
    <div>
      {timeLeft?.days +
        timeLeft?.hours +
        timeLeft?.minutes +
        timeLeft?.seconds >
      0 ? (
        <div>
          <span className='countdown text-secondary font-mono text-2xl mb-4'>
            <span style={{ '--value': timeLeft?.hours }}></span>:
            <span
              style={{
                '--value': timeLeft?.minutes,
              }}
            ></span>
            :
            <span
              style={{
                '--value': timeLeft?.seconds,
              }}
            ></span>
          </span>
        </div>
      ) : (
        <div>
          <span className='countdown text-secondary font-mono text-2xl mb-4'>
            <span style={{ '--value': 0 }}></span>:
            <span
              style={{
                '--value': 0,
              }}
            ></span>
            :
            <span
              style={{
                '--value': 0,
              }}
            ></span>
          </span>
        </div>
      )}
    </div>
  );
};

Timer.propTypes = {
  timeLeft: PropTypes.object,
};
