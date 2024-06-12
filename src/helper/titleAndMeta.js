import { APP_NAME } from "../common/constants";
import PropTypes from 'prop-types';

export const titleAndMeta = (title, description) => {
  document.title = `${APP_NAME} | ${title}`;

  const metadata = [

    { property: 'og:title', content: `${title}` },
    { property: 'og:url', content: `${window.location.href}` },
    { property: 'og:description', content: `${description}` },
  ];

  metadata.forEach(m => {
    const metaTag = document.createElement('meta');
    if (m.property) {
      metaTag.setAttribute('property', m.property);
    } else if (m.name) {
      metaTag.setAttribute('name', m.name);
    }
    metaTag.setAttribute('content', m.content);

    document.head.appendChild(metaTag);
  });
};

titleAndMeta.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};