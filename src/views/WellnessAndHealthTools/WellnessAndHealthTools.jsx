import ActivityLevelWaterIntake from '../../components/ActivityLevelWaterIntake/ActivityLevelWaterIntake/ActivityLevelWaterIntake';
import BodyMassIndex from '../../components/BMI/BodyMassIndex/BodyMassIndex';
import CalorieCalculator from '../../components/CalorieCalculator/CalorieCalculator/CalorieCalculator';

export default function WellnessHealthTools() {
  return (
    <div>
      <ActivityLevelWaterIntake />
      <BodyMassIndex />
      <CalorieCalculator />
    </div>
  );
}
