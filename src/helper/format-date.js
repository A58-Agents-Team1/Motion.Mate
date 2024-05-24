export const fullFormatDate = (date) =>
  new Date(date).toLocaleDateString('bg-BG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
    second: 'numeric',
  });

export const shortFormatDate = (date) =>
  new Date(date).toLocaleDateString('bg-BG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
