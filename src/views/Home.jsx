import { AppContext } from '../context/AppContext';
import Authenticated from '../hoc/Authenticated';
import { useContext } from 'react';

export default function Home() {
  const { userData } = useContext(AppContext);
  return (
    <>
      <div>
        <h1>Home</h1>
        <Authenticated>
          <p>Hello USER DATA: {userData?.username}</p>
        </Authenticated>
      </div>
    </>
  );
}
