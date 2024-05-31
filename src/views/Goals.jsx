import { useContext, useEffect, useState } from 'react';
import Goal from '../components/Goals/Goal';
import CreateGoal from '../components/Goals/CreateGoal';
import { APP_NAME } from '../common/constants';
import { ref, onValue } from 'firebase/database';
import { db } from '../config/firebase-config';
import { AppContext } from '../context/AppContext';

export default function Goals() {
  document.querySelector('title').textContent = `${APP_NAME} | Goals`;

  const { userData } = useContext(AppContext);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    return onValue(
      ref(db, `users/${userData?.username}/myGoals`),
      (snapshot) => {
        const goals = [];
        snapshot.forEach((child) => {
          goals.push({
            id: child.key,
            ...child.val(),
          });
        });
        setGoals(goals);
      }
    );
  }, []);

  return (
    <div className='flex flex-col w-full gap-2 overflow-x-auto'>
      <CreateGoal />
      {goals?.length > 0 ? (
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>Goals</th>
              <th>Name</th>
              <th>Time left</th>
              <th>Progress</th>
            </tr>
          </thead>
          {/* row */}
          <tbody>
            {goals.map((goal, idx) => (
              <tr
                key={goal?.id}
                className={`${idx % 2 === 0 && 'bg-base-200 '}`}
              >
                <Goal
                  id={goal?.id}
                  owner={goal?.owner}
                  name={goal?.name}
                  from={goal?.timePeriod?.from}
                  to={goal?.timePeriod?.to}
                  progress={goal?.progress}
                />
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Goals</th>
              <th>Name</th>
              <th>Time left</th>
              <th>Progress</th>
            </tr>
          </tfoot>
        </table>
      ) : (
        <div className='mx-auto my-2'>
          <h2 className='flex justify-center mb-2 text-lg'>No Goals found.</h2>
          <p>Create the first goal with the button above.</p>
        </div>
      )}
    </div>
  );
}
