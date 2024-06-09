import calorie from '../../assets/calorie.png';

export default function CalorieCalculator() {
  return (
    <div className='card p-4 flex flex-col bg-base-100 text-center m-4 border-2 border-gray-500 rounded-2xl shadow-2xl'>
      <p className='font-bold text-xl mb-8 text-primary'>
        What is Your Daily Caloric Needs Based on Activity Level
      </p>
      <p>
        Knowing how many calories you need to consume each day is essential for
        maintaining, losing, or gaining weight. Your activity level plays a
        significant role in determining this amount. Different activity levels
        require different amounts of calories to keep your body properly fueled.
      </p>
      <div className='mt-8 flex flex-col border-2 border-gray-500 rounded-3xl p-4 bg-orange-300 text-black'>
        <p>Calorie Calculator: </p>
      </div>
      <div className='text-center'>
        <h1 className='text-primary text-xl text-center font-bold mt-6'>
          Guidelines to Choose Your Activity Level
        </h1>
        <div className='flex items-center mx-4'>
          <div>
            <img src={calorie} alt='calorie' className='w-80' />
          </div>
          <div className='mx-4'>
            <p>
              <strong className='text-primary'>Sedentary:</strong> Choose this
              if you have a job that involves sitting most of the day, and you
              engage in very little physical activity.
            </p>
            <p>
              <strong className='text-primary'>Lightly Active:</strong> Choose
              this if you occasionally exercise or have a job that involves some
              walking or other light physical activities. If you engage in light
              exercise 1-3 times a week, this level is suitable.
            </p>
            <p>
              <strong className='text-primary'>Moderately Active:</strong>{' '}
              Choose this if you exercise moderately (like brisk walking,
              jogging, or cycling) 3-5 times a week or have a job that involves
              a significant amount of physical activity.
            </p>
            <p>
              <strong className='text-primary'>Very Active:</strong> Choose this
              if you engage in intense physical activity or sports almost every
              day of the week, or if you have a very physically demanding job.
            </p>
          </div>
        </div>
      </div>
      <div className='mb-4 mt-6'>
        <h1 className='text-primary font-bold'>
          Why is Knowing Your Caloric Needs Important?
        </h1>
        <p>
          Understanding your daily caloric needs is crucial for achieving your
          health goals, whether you want to maintain your current weight, lose
          weight, or gain weight. Consuming the right amount of calories helps
          you: Maintain energy levels Support bodily functions such as
          metabolism and muscle repair Prevent over- or under-eating, which can
          lead to health issues Optimize physical performance and recovery Use
          the guidelines above to select your activity level and ensure you`re
          meeting your daily caloric requirements for a healthier lifestyle.
        </p>
      </div>
    </div>
  );
}
