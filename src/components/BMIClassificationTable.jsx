export default function BMIClassificationTable() {
  const classifications = [
    { bmi: 'BMI', classification: 'Classification' },
    { bmi: 'Under 18.5', classification: 'Underweight', color: 'blue' },
    { bmi: '18.5 - 24.9', classification: 'Normal Weight', color: 'green' },
    { bmi: '25 - 29.9', classification: 'Overweight', color: 'yellow' },
    { bmi: '30 - 34.9', classification: 'Obesity Class I', color: 'orange' },
    { bmi: '35 - 39.9', classification: 'Obesity Class II', color: 'red' },
    { bmi: 'Over 40', classification: 'Obesity Class III', color: 'black' },
  ];

  return (
    <div className='flex flex-col items-center justify-center my-6'>
      <h2 className='font-bold text-2xl mb-4'>BMI Classification Table</h2>
      <div className='w-full max-w-md'>
        {classifications.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 border-b border-gray-300 text-center ${
              index === 0 ? 'font-bold underline' : ''
            }`}
          >
            <div className='flex flex-row items-center'>
              <span
                className='inline-block w-3 h-3 rounded-full mr-4'
                style={{ backgroundColor: item.color }}
              ></span>
              <div className='font-semibold text-lg'>{item.bmi}</div>
            </div>
            <div className='text-lg'>{item.classification}</div>
          </div>
        ))}
      </div>
      <p className='mt-2 text-sm'>
        This BMI calculator is for adults 20 years or older. Talk to your doctor
        about your BMI if you`re under the age of 20.
      </p>
    </div>
  );
}
