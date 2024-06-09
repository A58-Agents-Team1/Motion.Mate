import { useContext, useEffect, useState } from 'react';
import { AccountStats } from '../components/HomeAuth/AccountStats';
import { Divider } from '../components/HomeAuth/Divider';
import { onValue, ref } from 'firebase/database';
import { AppContext } from '../context/AppContext';
import { db } from '../config/firebase-config';
import { updateGoalProgressCalories } from '../helper/update-goals-progress';

export const HomeAuthenticated = () => {
  const [timer, setTimer] = useState(null);
  const { userData } = useContext(AppContext);
  const [stopButton, setStopButton] = useState('');
  const [workoutTimer, setWorkoutTimer] = useState(null);
  const [startWorkout, setStartWorkout] = useState(null);
  const [calories, setCalories] = useState();

  useEffect(() => {
    return onValue(
      ref(db, `users/${userData.username}/endCurrentExercise`),
      (snapshot) => {
        if (snapshot?.val()) {
          setTimer(snapshot.val().timeLeft);
          setStopButton(snapshot.val().exerciseId);
          setCalories(snapshot.val().calories);
        } else {
          setTimer(null);
          setStopButton('');
        }
      }
    );
  }, []);

  useEffect(() => {
    return onValue(
      ref(db, `users/${userData.username}/workoutTimer/timer`),
      (snapshot) => {
        if (snapshot?.val()) {
          setWorkoutTimer(snapshot.val());
          setStartWorkout(true);
        } else {
          setWorkoutTimer(null);
          setStartWorkout(false);
        }
      }
    );
  }, []);

  useEffect(() => {
    updateGoalProgressCalories(userData.username, calories);
  }, [calories]);

  return (
    <>
      <AccountStats
        timer={timer}
        setStopButton={setStopButton}
        workoutTimer={workoutTimer}
        startWorkout={startWorkout}
        setTimer={setTimer}
      />
      <Divider
        stopButton={stopButton}
        calories={calories}
      />
    </>
  );
};
