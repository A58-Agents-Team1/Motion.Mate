import { faMedal, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { deleteGoal } from '../../services/goal.service';
import { AppContext } from '../../context/AppContext';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';
import InfoBite from '../Exercise/InfoBite';

export const FinishedGoal = () => {
  const [goals, setGoals] = useState();
  const { userData } = useContext(AppContext);

  useEffect(() => {
    return onValue(
      ref(db, `users/${userData?.username}/myGoals`),

      (snapshot) => {
        try {
          if (snapshot.val()) {
            const goalsWithId = Object.entries(snapshot?.val()).map(
              ([id, goal]) => ({
                id,
                ...goal,
              })
            );

            const result = goalsWithId.filter((goal) => goal?.progress >= 100);
            setGoals(result);
          }
        } catch (error) {
          throw new Error(error.message);
        }
      }
    );
  }, []);

  const removeGoalAsync = async (userData, goal) => {
    await deleteGoal(userData?.username, goal.id);
  };

  return (
    <>
      {goals ? (
        <>
          {goals?.map((goal) => (
            <div key={goal.id}>
              <div className='flex flex-col items-center'>
                <div className='card w-96 bg-base-300 m-2 shadow-xl'>
                  <div className='card-body p-4'>
                    <div className='flex justify-between items-center'>
                      <h2 className='card-title text-lg font-bold'>Goal</h2>
                      <h3 className='text-lg font-bold'>{goal.name}</h3>
                      <div className='flex space-x-2'>
                        <FontAwesomeIcon
                          icon={faStar}
                          className='text-yellow-500'
                        />
                        <FontAwesomeIcon
                          icon={faMedal}
                          className='text-blue-500'
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-2 '>
                      <InfoBite
                        isBlock
                        title={'Duration'}
                        content={`From : ${new Date(
                          goal?.timePeriod?.from
                        ).toLocaleString()}`}
                      />

                      <InfoBite
                        isBlock
                        content={`To: ${new Date(
                          goal?.timePeriod?.to
                        ).toLocaleString()}`}
                      />

                      <InfoBite
                        title={'Calories'}
                        content={goal.calories}
                      />
                    </div>

                    <div className='card-actions justify-end mt-4'>
                      <button
                        onClick={() => removeGoalAsync(userData, goal)}
                        className='btn btn-secondary'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>Finish goals to see them here!</>
      )}
    </>
  );
};
