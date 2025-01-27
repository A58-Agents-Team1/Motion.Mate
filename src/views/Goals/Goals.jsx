import { useContext, useEffect, useState } from 'react';
import { APP_NAME } from '../../common/constants';
import { ref, onValue } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { AppContext } from '../../context/AppContext';
import CreateGoal from '../../components/Goals/CreateGoal';
import GoalsTable from '../../components/Goals/GoalsTable';

export default function Goals() {
  document.querySelector('title').textContent = `${APP_NAME} | Goals`;

  const { userData } = useContext(AppContext);

  const [goals, setGoals] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendsGoals, setFriendsGoals] = useState([]);

  const friendGoalsMap = new Map();

  useEffect(() => {
    return onValue(ref(db, `users/${userData?.username}`), (snapshot) => {
      const _goals = [];
      const myGoals = snapshot.val()?.myGoals;
      const friends = Object.keys(snapshot.val()?.friends || []);

      if (!myGoals) setGoals([]);

      setFriends(friends);

      for (const key in myGoals) {
        _goals.push({
          id: key,
          ...snapshot.val()?.myGoals[key],
        });
        setGoals(_goals);
      }
    });
  }, []);

  useEffect(() => {
    if (!friends.length) return;

    friends.forEach((friend) => {
      return onValue(ref(db, `users/${friend}`), (snapshot) => {
        const friendGoals = snapshot.val()?.myGoals;
        if (!friendGoals) return;

        for (const key in friendGoals) {
          friendGoalsMap.set(key, {
            id: key,
            ...friendGoals[key],
          });
        }
        setFriendsGoals([...friendGoalsMap.values()]);
      });
    });
  }, [friends]);

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
