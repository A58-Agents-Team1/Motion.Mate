import { goalCreateValidation } from '../common/goal.validations';
import { db } from '../config/firebase-config'
import { get, push, ref, set } from 'firebase/database'

export const createGoal = async (name, owner, timePeriodStart, timePeriodEnd) => {
  try {
    goalCreateValidation(name, owner, timePeriodStart, timePeriodEnd);
    const goal = {
      name,
      owner,
      timePeriod: {
        from: timePeriodStart,
        to: timePeriodEnd
      },
      sharedWith: null,
      progress: 0
    }
    return await push(ref(db, `goals/`), goal);
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getGoals = async () => {
  try {
    const result = [];
    const snapshot = (await get(ref(db, 'goals')));
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

// TODO: Implement the following functions
export const getGoalById = async (goalId) => {
  try {
    const goal = await get(ref(db, `goals/${goalId}`));
    return await goal.val();
  }
  catch (error) {
    throw new Error(error.message);
  }
}

export const updateGoal = async (goalId, updates) => {
  try {
    const goal = await getGoalById(goalId);
    return await set(ref(db, `goals/${goalId}`), {
      ...goal,
      ...updates
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export const deleteGoal = async (goalId) => {
  try {
    return await set(ref(db, `goals/${goalId}`), null);
  } catch (error) {
    throw new Error(error.message);
  }

}

// export const shareGoal = async (goalId) => {

// }
