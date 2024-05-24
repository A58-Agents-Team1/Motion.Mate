import PropTypes from 'prop-types';
export default function GoalButton({
  title,
  wide = false,
  primary = true,
  styles = '',
  onClick,
}) {
  const _primaryStyles = primary ? 'btn btn-primary' : 'btn btn-secondary';
  const _wide = wide && 'btn-wide';
  return (
    <button
      type='button'
      className={`${styles} ${_primaryStyles} ${_wide}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

GoalButton.propTypes = {
  title: PropTypes.string.isRequired,
  wide: PropTypes.bool,
  primary: PropTypes.bool,
  styles: PropTypes.string,
  onClick: PropTypes.func,
};
