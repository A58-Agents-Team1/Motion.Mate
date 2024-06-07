import { useContext, useEffect, useState } from 'react';
import { AccountStats } from '../components/HomeAuth/AccountStats';
import { Divider } from '../components/HomeAuth/Divider';
import { onValue, ref } from 'firebase/database';
import { AppContext } from '../context/AppContext';
import { db } from '../config/firebase-config';

export const HomeAuthenticated = () => {
  const [timer, setTimer] = useState(null);
  const { userData } = useContext(AppContext);
  const [stopButton, setStopButton] = useState('');

  useEffect(() => {
    return onValue(
      ref(db, `users/${userData.username}/endCurrentExercise`),
      (snapshot) => {
        if (snapshot.val()) {
          setTimer(snapshot.val().timeLeft);
          setStopButton(snapshot.val().exerciseId);
        } else {
          setTimer(null);
          setStopButton('');
        }
      }
    );
  }, []);

  return (
    <>
      <AccountStats timer={timer} />
      <Divider stopButton={stopButton} />
    </>
  );
};
