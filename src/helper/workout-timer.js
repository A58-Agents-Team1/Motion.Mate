export const workoutTimer = async (
  content,
  userData,
  setContent,
  StartTimerWorkout
) => {
  const endDate = new Date();
  endDate.setHours(endDate.getHours() + Number(content.hours));
  endDate.setMinutes(endDate.getMinutes() + Number(content.minutes));
  endDate.setSeconds(endDate.getSeconds() + Number(content.seconds));
  await StartTimerWorkout(userData.username, endDate.getTime());
  setContent({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
};
