import { useContext, useEffect, useState } from 'react';
import CreateGoal from '../../components/Goals/CreateGoal';
import { APP_NAME } from '../../common/constants';
import { ref, onValue } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { AppContext } from '../../context/AppContext';
import { getGoals } from '../../services/goal.service';
import GoalsTable from '../../components/Goals/GoalsTable';

export default function Goals() {
  document.querySelector('title').textContent = `${APP_NAME} | Goals`;

  const { userData } = useContext(AppContext);
  const [goals, setGoals] = useState([]);
  const [friendsGoals, setFriendsGoals] = useState([]);

  useEffect(() => {
    return onValue(ref(db, `users/${userData?.username}`), (snapshot) => {
      const _goals = [];
      const _friendsGoals = [];
      const myGoals = snapshot.val()?.myGoals;
      const friends = snapshot.val()?.friends;

      for (const key in myGoals) {
        _goals.push({
          id: key,
          ...snapshot.val()?.myGoals[key],
        });
      }
      for (const friend in friends) {
        getGoals(friend)
          .then((friendGoals) => {
            friendGoals.forEach((goal) => {
              _friendsGoals.push(goal);
            });
          })
          .then(() => {
            !friendsGoals.includes(_friendsGoals?.id) &&
              setFriendsGoals(_friendsGoals);
          });
      }

      setGoals(_goals);
    });
  }, []);

  return (
    <div className='flex flex-col w-full gap-2  overflow-x-auto'>
      <CreateGoal />
      <h2 className='label place-content-center border-2 border-primary rounded m-2'>
        My Goals
      </h2>

      <GoalsTable
        goals={goals}
        myGoals={true}
      />
      <br />

      <h2 className='label place-content-center border-2 border-primary rounded m-2'>
        My Friends Goals
      </h2>

      {friendsGoals && <GoalsTable goals={friendsGoals} />}
    </div>
  );
}
