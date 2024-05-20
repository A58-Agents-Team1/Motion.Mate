import { AccountStats } from '../components/Account.Stats';
import { Exercise } from '../components/Exercise';
import { AppContext } from '../context/AppContext';
import Authenticated from '../hoc/Authenticated';
import { useContext } from 'react';

export default function Home() {
  const { userData } = useContext(AppContext);
  return (
    <>
      <div className='flex flex-col gap-5'>
        <Authenticated>
          <AccountStats />
          <Exercise />
        </Authenticated>
      </div>
    </>
  );
}
