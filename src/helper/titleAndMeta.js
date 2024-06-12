import { APP_NAME } from "../common/constants";
import { shortFormatDate } from "./format-date";
import Image from '../assets/logo.png';
import PropTypes from 'prop-types';

export const titleAndMeta = (title, description, avatar = null, firstName, lastName) => {
  document.title = `${APP_NAME} | ${title}`;

  const metadata = [
    { name: 'description', content: `${description}` },
    { name: 'keywords', content: 'goal, detailed goal' },
    { name: 'author', content: `${firstName} ${lastName}` },
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { charset: 'UTF-8' },
    {
      name: 'date',
      content: `${shortFormatDate(new Date().getTime())}`,
      scheme: 'DD-MM-YYYY',
    },
    { property: 'og:title', content: `${title}` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${window.location.href}` },
    { property: 'og:image', content: `${avatar || Image}` },
    { property: 'og:description', content: `${description}` },
    { property: 'og:site_name', content: `Motion Mate` },
    { name: 'og:locale', content: 'en_US' },
    { name: 'MotionMate:card', content: `${description}` },
    { name: 'MotionMate:site', content: '@' },
    { name: 'MotionMate:creator', content: '@' },
    {
      name: 'MotionMate:title', content: `${title}`
    },
    { name: 'MotionMate:description', content: `${description}` },
    { name: 'MotionMate:image', content: `${Image}` },
    {
      name: 'MotionMate:image:alt',
      content: `${firstName} ${lastName}`,
    },

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
    if (m.scheme) {
      metaTag.setAttribute('scheme', m.scheme);
    }
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