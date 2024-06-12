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
    {
      name: 'date',
      content: `${shortFormatDate(new Date().getTime())}`,
      scheme: 'DD-MM-YYYY',
    },
    { name: 'og:title', content: `${title}` },
    { name: 'og:type', content: 'website' },
    { name: 'og:url', content: `${window.location.href}` },
    { name: 'og:image', content: `${avatar || Image}` },
    { name: 'og:description', content: `${description}` },
    { name: 'og:site_name', content: `Motion Mate` },
    { name: 'og:locale', content: 'en_US' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:site', content: '@' },
    { name: 'twitter:creator', content: '@' },
    {
      name: 'twitter:title', content: `${title}`
    },
    { name: 'twitter:description', content: `${description}` },
    { name: 'twitter:image', content: `${Image}` },
    {
      name: 'twitter:image:alt',
      content: `${firstName} ${lastName}`,
    },
  ];
  metadata.forEach(m => {
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('name', m.name);
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