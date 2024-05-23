import { useEffect, useState } from 'react';
import { getExercises } from '../../services/exercise.service';
import { ExerciseCategory } from './ExerciseCategory';
import { AccountStats } from './AccountStats';

export const Exercise = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [allExercises, setAllExercises] = useState([]);

  const [startTimer, setStartTimer] = useState(false);
  const [timer, setTimer] = useState(0);

  // use effect to get all exercises
  useEffect(() => {
    const getAllExercises = async () => {
      const all = await getExercises();
      setAllExercises(all);
    };
    getAllExercises();
  }, []);

  // use effect to get all exercises but also filter them to unique categories
  useEffect(() => {
    const fetchExercises = async () => {
      const exercises = await getExercises();
      const uniqueCategories = Object.values(
        exercises.reduce((acc, exercise) => {
          if (!acc[exercise.category]) {
            acc[exercise.category] = exercise;
          }
          return acc;
        }, {})
      );
      setAllPosts(uniqueCategories);
    };

    fetchExercises();
  }, []);

  const handleBackToMain = () => {
    setSelectedCategory(false);
  };

  return (
    <>
      <AccountStats
        startTimer={startTimer}
        timer={timer}
        setStartTimer={setStartTimer}
        setTimer={setTimer}
      />
      {selectedCategory === false && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
          {allPosts.length > 0 &&
            allPosts.map((post) => (
              <div
                className='card w-64 bg-base-100 shadow-xl image-full'
                key={post.id}
              >
                <figure>
                  <img src={`src/assets/${post?.category}.jpg`} alt='Shoes' />
                </figure>
                <div className='card-body'>
                  <h2 className='card-title'>{post.category}</h2>
                  <p>{post.title}</p>
                  <p>{post.shortDescription}</p>

                  <button
                    onClick={() => setSelectedCategory(post.category)}
                    className='btn btn-primary'
                  >
                    Join Now
                  </button>
                  <p className='text-'>Level : {post.level}</p>
                </div>
              </div>
            ))}
        </div>
      )}

      {selectedCategory && (
        <div>
          <ExerciseCategory
            category={selectedCategory}
            onBackToMain={handleBackToMain}
            allPosts={allExercises}
            startTimer={startTimer}
            timer={timer}
            setTimer={setTimer}
            setStartTimer={setStartTimer}
          />
        </div>
      )}
    </>
  );
};
