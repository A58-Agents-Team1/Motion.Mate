export const fullFormatDate = (date) =>
  new Date(date).toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
    second: 'numeric',
  });

export const shortFormatDate = (date) =>
  new Date(date).toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const calculateTimeLeft = (to) => {
  const now = new Date().getTime();
  const timeLeft = to - now;

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
};
