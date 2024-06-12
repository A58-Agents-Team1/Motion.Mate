import {
  faMedal,
  faRankingStar,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { deleteGoal, getGoals } from '../../services/goal.service';
import { AppContext } from '../../context/AppContext';
import InfoBite from '../Exercise/InfoBite';
import { useNavigate } from 'react-router-dom';
import { NoActivityCard } from './NoActivityCard';
import { BASE } from '../../common/constants';

export const FinishedGoal = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState();
  const { userData } = useContext(AppContext);
  const [goalId, setGoalId] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const result = await getGoals(userData?.username);

      if (result) {
        const filtered = result.filter((goal) => goal?.progress >= 100);
        setGoals(filtered);
      }
    };
    fetch();
  }, [goalId]);

  const removeGoalAsync = async (userData, goal) => {
    setGoalId(goal.id);
    await deleteGoal(userData?.username, goal.id);
  };

  return (
    <>
      {goals?.length > 0 ? (
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
                        title={'Duration From'}
                        content={`${new Date(
                          goal?.timePeriod?.from
                        ).toLocaleString()}`}
                      />

                      <InfoBite
                        isBlock
                        title={'Duration To'}
                        content={`${new Date(
                          goal?.timePeriod?.to
                        ).toLocaleString()}`}
                      />

                      <InfoBite
                        title={'Calories'}
                        content={`${goal.calories} kcal`}
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
        <>
          <NoActivityCard
            onClick={() => navigate(`${BASE}goals`)}
            icon={faRankingStar}
            title={'No finished goals!'}
            content={
              'Challenge yourself with setting personal goals to keep track of your progress!'
            }
          />
        </>
      )}
    </>
  );
};
