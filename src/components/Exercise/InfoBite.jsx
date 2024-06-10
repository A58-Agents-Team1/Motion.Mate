import React from 'react';
import PropTypes from 'prop-types';

const InfoBite = ({ title, content, isBlock }) => {
  const flexClass = isBlock ? '' : 'flex items-center';
  const isString = typeof content !== 'string' ? String(content) : content;

  return (
    <div className={`${flexClass} border border-primary p-1 px-2 rounded-md`}>
      <strong className='mr-1 text-primary'>{title}:</strong>

      <p>{isString}</p>
    </div>
  );
};

export default InfoBite;

InfoBite.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  isBlock: PropTypes.bool,
};
