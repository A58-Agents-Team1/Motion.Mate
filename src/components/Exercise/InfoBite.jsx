import PropTypes from 'prop-types';

const InfoBite = ({ title, content, isBlock }) => {
  const flexClass = isBlock ? '' : 'flex items-center';
  const hasTitle = title ? `${title}:` : '';

  return (
    <div className={`${flexClass} border border-primary p-1 px-2 rounded-md`}>
      <strong className='mr-1 text-primary'>{hasTitle}</strong>

      <p>{content}</p>
    </div>
  );
};

InfoBite.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  isBlock: PropTypes.bool,
};

export default InfoBite;
