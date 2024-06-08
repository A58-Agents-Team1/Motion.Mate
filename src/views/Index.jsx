import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
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
