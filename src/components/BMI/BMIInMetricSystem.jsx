import PropTypes from 'prop-types';

export default function BMIInMetricSystem({ form, updateForm }) {
  return (
    <div className='mt-2'>
      <label htmlFor='weight'>Weight in kg: </label>
      <input
        type='number'
        name='weight'
        placeholder='kilograms'
        value={form?.weight}
        onChange={updateForm('weight')}
        className='border-2 border-gray-500 rounded p-2 mr-6 bg-gray-200 shadow-xl text-black'
      />
      <label htmlFor='height'>Height in cm: </label>
      <input
        type='number'
        name='height'
        placeholder='centimeters'
        value={form?.height}
        onChange={updateForm('height')}
        className='border-2 border-gray-500 rounded p-2 m-2 bg-gray-200 shadow-xl text-black'
      />
    </div>
  );
}

BMIInMetricSystem.propTypes = {
  form: PropTypes.object,
  updateForm: PropTypes.func,
};
