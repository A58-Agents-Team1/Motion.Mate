import { useEffect, useState } from 'react';
import Goal from '../components/Goals/Goal';
import { getGoals } from '../services/goal.service';
import CreateGoal from '../components/Navigation/CreateGoal';
import { APP_NAME } from '../common/constants';

export default function Goals() {
  document.querySelector('title').textContent = `${APP_NAME} | Goals`;

  const [goals, setGoals] = useState([]);
  useEffect(() => {
    const getAllGoals = async () => {
      const allGoals = await getGoals();
      setGoals(allGoals);
    };
    getAllGoals();
  }, []);

  // TODO: Implement the following function
  // useEffect(() => {
  //   return onChildChanged();
  // }, []);

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
              <th>Starts</th>
              <th>Ends</th>
              <th>Progress</th>
              <th>State</th>
            </tr>
          </thead>
          {/* row */}
          <tbody>
            {goals.map((goal) => (
              <tr key={goal?.name}>
                <Goal
                  owner={goal?.owner}
                  name={goal?.name}
                  from={goal?.timePeriod?.from}
                  to={goal?.timePeriod?.to}
                  status={goal?.status}
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
              <th>Starts</th>
              <th>Ends</th>
              <th>Progress</th>
              <th>State</th>
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
