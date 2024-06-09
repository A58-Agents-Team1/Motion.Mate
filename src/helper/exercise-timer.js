export const handleOnStart = async (exercise, startExercise, userData) => {
  const endDate = new Date();
  endDate.setHours(endDate.getHours() + Number(exercise.duration.hours));
  endDate.setMinutes(endDate.getMinutes() + Number(exercise.duration.minutes));
  endDate.setSeconds(endDate.getSeconds() + Number(exercise.duration.seconds));

  await startExercise(
    userData.username,
    endDate.getTime(),
    exercise.id,
    exercise.calories
  );
};
