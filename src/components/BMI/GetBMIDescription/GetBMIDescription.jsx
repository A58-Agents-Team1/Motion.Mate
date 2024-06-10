import { BMI_THRESHOLDS } from '../../../common/constants';

export default function GetBMIDescription(BMI) {
  if (BMI === BMI_THRESHOLDS.INITIAL) {
    return <p>Enter your weight and height to calculate your BMI.</p>;
  } else if (BMI < BMI_THRESHOLDS.UNDERWEIGHT) {
    return (
      <p>
        Your BMI is {BMI}. You are{' '}
        <span className='text-blue-700 font-bold'>underweight</span>. Talk to
        your doctor about your weight.
      </p>
    );
  } else if (
    BMI >= BMI_THRESHOLDS.NORMAL_WEIGHT_MIN &&
    BMI <= BMI_THRESHOLDS.NORMAL_WEIGHT_MAX
  ) {
    return (
      <p>
        Your BMI is {BMI}. You have a{' '}
        <span className='text-green-700 font-bold'>normal weight</span>. Keep up
        the good work.
      </p>
    );
  } else if (
    BMI >= BMI_THRESHOLDS.OVERWEIGHT_MIN &&
    BMI <= BMI_THRESHOLDS.OVERWEIGHT_MAX
  ) {
    return (
      <p>
        Your BMI is {BMI}. You are{' '}
        <span className='text-yellow-500 font-bold'>overweight</span>. Talk to
        your doctor about your weight.
      </p>
    );
  } else if (
    BMI >= BMI_THRESHOLDS.OBESITY_I_MIN &&
    BMI <= BMI_THRESHOLDS.OBESITY_I_MAX
  ) {
    return (
      <p>
        Your BMI is {BMI}. You are in{' '}
        <span className='text-orange-500 font-bold'>Obesity Class I</span>. Talk
        to your doctor about your weight.
      </p>
    );
  } else if (
    BMI >= BMI_THRESHOLDS.OBESITY_II_MIN &&
    BMI <= BMI_THRESHOLDS.OBESITY_II_MAX
  ) {
    return (
      <p>
        Your BMI is {BMI}. You are in{' '}
        <span className='text-red-500 font-bold'>Obesity Class II</span>. Talk
        to your doctor about your weight.
      </p>
    );
  } else if (BMI >= BMI_THRESHOLDS.OBESITY_III_MIN) {
    return (
      <p>
        Your BMI is {BMI}. You are in{' '}
        <span className='text-purple-900 font-bold'>Obesity Class III</span>.
        Talk to your doctor about your weight.
      </p>
    );
  } else {
    return null;
  }
}
