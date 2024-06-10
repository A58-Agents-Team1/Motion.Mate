import React from 'react';
import PropTypes from 'prop-types';

const InfoBite = ({ title, content, isBlock }) => {
  const flexClass = isBlock ? '' : 'flex items-center';

  return (
    <div className={`${flexClass} border border-primary p-1 px-2 rounded-md`}>
      <strong className='mr-1 text-primary'>{title}:</strong>

      <p>{content}</p>
    </div>
  );
};

export default InfoBite;

InfoBite.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  isBlock: PropTypes.bool,
};
