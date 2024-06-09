import ActivityLevelWaterIntake from '../../components/ActivityLevelWaterIntake/ActivityLevelWaterIntake';
import BodyMassIndex from '../../components/BMI/BodyMassIndex';
import CalorieCalculator from '../../components/CalorieCalculator/CalorieCalculator';

export default function WellnessHealthTools() {
  return (
    <div>
      <ActivityLevelWaterIntake />
      <BodyMassIndex />
      <CalorieCalculator />
    </div>
  );
}
