import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_NAME } from '../common/constants';

export default function Index() {
  document.querySelector('title').textContent = `${APP_NAME} | Home`;

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, []);

  return (
    <div>
      <h1>Welcome to Motion Mate</h1>
    </div>
  );
}
