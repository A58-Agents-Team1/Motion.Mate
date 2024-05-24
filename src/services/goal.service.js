import { goalCreateValidation } from '../common/goal.validations';
import { db } from '../config/firebase-config'
import { get, ref, set } from 'firebase/database'

export const createGoal = async (name, owner, timePeriodStart, timePeriodEnd) => {
  try {
    goalCreateValidation(name, owner, timePeriodStart, timePeriodEnd);
    return await set(ref(db, `goals/${name}`), {
      name,
      owner,
      timePeriod: {
        from: timePeriodStart,
        to: timePeriodEnd
      },
      sharedWith: null,
      status: 'pending',
      progress: 0
    });

  } catch (error) {
    throw new Error(error.message);
  }
}

export const getGoals = async () => {
  try {
    const result = [];
    const snapshot = (await get(ref(db, 'goals'))).val();
    Object.keys(snapshot).forEach((key) => {
      result.push(snapshot[key]);
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// TODO: Implement the following functions
export const getGoalById = async () => {

}

export const updateGoal = async () => {

}

export const deleteGoal = async () => {

}

export const shareGoal = async () => {

}
