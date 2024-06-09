import { GOAL_MIN_CALORIES, GOAL_MIN_EXERCISES, GOAL_MIN_PROGRESS } from '../common/constants';
import { goalCreateValidation } from '../common/goal.validations';
import { db } from '../config/firebase-config'
import { get, push, ref, remove, set } from 'firebase/database'

export const createGoal = async (
  name,
  owner,
  timePeriodStart,
  timePeriodEnd,
  type,
  exercises = GOAL_MIN_EXERCISES,
  progress = GOAL_MIN_PROGRESS,
  calories = GOAL_MIN_CALORIES,
) => {
  try {
    const snapshot = await get(ref(db, `users/${owner}/myGoals/`));
    snapshot.forEach((child) => {
      if (child.val().name === name) {
        throw new Error('Goal with this name already exists');
      }
    }
    );
    goalCreateValidation(name, owner, timePeriodStart, timePeriodEnd, exercises, progress, calories);
    const goal = {
      name,
      owner,
      timePeriod: {
        from: timePeriodStart,
        to: timePeriodEnd
      },
      sharedWith: null,
      type,
      exercises,
      progress,
      calories,
      exercisesDone: 0,
      caloriesBurned: 0
    }

    const goalId = await push(ref(db, `users/${owner}/myGoals/`), goal);

    return goalId
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getGoals = async (username) => {
  try {
    const result = [];
    const snapshot = (await get(ref(db, `users/${username}/myGoals/`)));
    snapshot.forEach((child) => {
      result.push({
        id: child.key,
        ...child.val(),
      });
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getGoalById = async (username, goalId) => {
  try {
    const goal = await get(ref(db, `users/${username}/myGoals/${goalId}`));
    return await goal.val();
  }
  catch (error) {
    throw new Error(error.message);
  }
}

export const updateGoal = async (username, goalId, updates) => {
  try {
    const goal = await getGoalById(goalId);
    return await set(ref(db, `users/${username}/myGoals/${goalId}`), {
      ...goal,
      ...updates
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export const deleteGoal = async (username, goalId) => {
  try {
    await remove(ref(db, `users/${username}/myGoals/${goalId}`));
  } catch (error) {
    throw new Error(error.message);
  }

}

export const updateGoalProgress = async (username, goalId, progress) => {
  try {
    return await set(ref(db, `users/${username}/myGoals/${goalId}/progress`), progress);
  } catch (error) {
    throw new Error(error.message);
  }
}
