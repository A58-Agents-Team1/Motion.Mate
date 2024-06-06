import PropTypes from 'prop-types';
import { WEIGHT_MAX_LBS, WEIGHT_MIN_LBS } from '../../common/constants';

export default function ImperialWaterIntake({ weight, setWeight }) {
  return (
    <>
      <label>Weight in lbs:</label>
      <input
        type='number'
        value={weight}
        min={WEIGHT_MIN_LBS}
        max={WEIGHT_MAX_LBS}
        onChange={(e) => setWeight(e.target.value)}
        placeholder='pounds'
        className='border-2 border-gray-500 rounded p-2 mr-6 ml-1 mt-2 bg-gray-200 shadow-xl text-black w-28'
      />
    </>
  );
}

ImperialWaterIntake.propTypes = {
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setWeight: PropTypes.func,
};
