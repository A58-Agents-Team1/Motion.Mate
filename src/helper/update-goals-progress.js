import {
  getGoals,
  markAsDone,
  updateGoalProgress,
} from '../services/goal.service';
import { getUserScores } from '../services/users.service';

export const updateGoalProgressCalories = async (username) => {
  const allGoals = await getGoals(username);
  const userScores = await getUserScores(username);

  const caloriesBurned = userScores.updatedCalories; // 168
  if (allGoals) {
    allGoals
      .filter((goal) => goal?.type === 'calories')
      .map(async (goal) => {
        let calculate = Math.floor((caloriesBurned / goal.calories) * 100);
        if (calculate > 100) {
          calculate = 100;
        }

        await updateGoalProgress(username, goal?.id, calculate);
      });

    const fullProgress = allGoals
      .filter((goal) => goal.progress === 100)
      .map(async (goal) => {
        return await markAsDone(username, goal.id);
      });
  }
};

// console.log(50 % 100);
