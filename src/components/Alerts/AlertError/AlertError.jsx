import PropTypes from 'prop-types';

const AlertError = ({ message }) => {
  return (
    <div className='toast toast-end z-50'>
      <div className='alert alert-error'>{message}</div>
    </div>
  );
};

AlertError.propTypes = {
  message: PropTypes.string.isRequired,
};

export default AlertError;
