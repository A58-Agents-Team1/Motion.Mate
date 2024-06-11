import {
  getGoals,
  markAsDone,
  updateGoalCalories,
  updateGoalProgress,
} from '../services/goal.service';

export const updateGoalProgressCalories = async (username, calories) => {
  const allGoals = await getGoals(username);

  if (allGoals) {
    for (const goal of allGoals.filter(
      (goal) => goal?.type === 'calories' && !goal?.isDone
    )) {
      const today = new Date().getTime();
      if (calories) {
        if (
          goal?.timePeriod?.from <= today &&
          goal?.timePeriod?.to >= today
        ) {
          await updateGoalCalories(username, goal, goal?.id, calories);

          (await getGoals(username)).map(async (goal) => {
            let calculate = Math.floor(
              (goal.caloriesBurned / goal.calories) * 100
            );

            if (calculate > 100) {
              calculate = 100;
            }
            await updateGoalProgress(username, goal?.id, calculate);
            if (goal.progress === 100) {
              await markAsDone(username, goal.id);
            }
          });
        }
      }
    }
  }
};
