import { Exercise } from '../components/Exercise/Exercise';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

export default function Home() {
  return (
    <>
      <div className='flex flex-col gap-5'>
        <Exercise />
      </div>
    </>
  );
}
