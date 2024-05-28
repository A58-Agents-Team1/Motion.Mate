import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function LoginBy({
  placeholder,
  type,
  form,
  updateForm,
  handleLogin,
}) {
  return (
    <>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>
            {placeholder} <span className='text-red-600'>*</span>
          </span>
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className='input input-bordered'
          value={form}
          onChange={updateForm(placeholder.toLowerCase())}
          required
        />
      </div>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>
            Password <span className='text-red-600'>*</span>
          </span>
        </label>
        <input
          type='password'
          placeholder='password'
          className='input input-bordered'
          value={form.password}
          onChange={updateForm('password')}
          required
        />
        <label className='label'>
          <NavLink to='/contact-us' className='label-text-alt link link-hover'>
            Forgot password?
          </NavLink>
        </label>
      </div>
      <div className='form-control mt-6'>
        <button type='button' className='btn btn-primary' onClick={handleLogin}>
          Login
        </button>
      </div>
    </>
  );
}

LoginBy.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  updateForm: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};
