import { APP_NAME } from "../common/constants";
import Image from '../assets/logo.png';
import PropTypes from 'prop-types';

export const titleAndMeta = (title, description) => {
  document.title = `${APP_NAME} | ${title}`;

  const metadata = [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

    { property: 'og:title', content: `${title}` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${window.location.href}` },
    { property: 'og:image', content: `${Image}` },
    { property: 'og:description', content: `${description}` },
    { property: 'og:site_name', content: `Motion Mate` },
  ];
  const existingMetaTags = document.querySelectorAll('meta');
  existingMetaTags.forEach(tag => tag.remove());

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