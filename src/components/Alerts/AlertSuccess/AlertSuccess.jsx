import PropTypes from 'prop-types';

const AlertSuccess = ({ message }) => {
  return (
    <div className='toast toast-end z-50'>
      <div className='alert alert-success'>
        <span>{message}</span>
      </div>
    </div>
  );
};

AlertSuccess.propTypes = {
  message: PropTypes.string.isRequired,
};
export default AlertSuccess;
