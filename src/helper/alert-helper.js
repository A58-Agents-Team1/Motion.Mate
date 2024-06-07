export const alertHelper = (setMessage, setAlert, message) => {
  setMessage(message);
  setAlert(true);
  setTimeout(() => {
    setAlert(false);
    setMessage(null);
  }, 3000);
  return () => clearTimeout();
};
