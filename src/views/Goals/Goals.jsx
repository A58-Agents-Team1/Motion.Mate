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
  const [counter, setCounter] = useState(0);

  const friendGoalsMap = new Map();

  useEffect(() => {
    return onValue(ref(db, `users/${userData?.username}`), (snapshot) => {
      const _goals = [];
      const myGoals = snapshot.val()?.myGoals;
      const friends = Object.keys(snapshot.val()?.friends);

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
    if (!friends) return;
    if (friends.length === 0) return;
    if (counter > friends.length) {
      friendGoalsMap.clear();
      setFriendsGoals([]);
      setCounter(0);
    }
    friends?.map((friend) => {
      return onValue(ref(db, `users/${friend}`), (snapshot) => {
        const myGoals = snapshot.val()?.myGoals;

        for (const key in myGoals) {
          friendGoalsMap.set(key, {
            id: key,
            ...snapshot.val()?.myGoals[key],
          });
        }
        setFriendsGoals([...friendGoalsMap.values()]);
        setCounter((prev) => prev + 1);
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
