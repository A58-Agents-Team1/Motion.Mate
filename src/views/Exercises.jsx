import { useContext, useEffect, useState } from 'react';
import { deleteExercise, getExercises } from '../services/exercise.service';
import { AppContext } from '../context/AppContext';

export const Exercises = ({ category, id, setSelectedCategory }) => {
  const [exercises, setExercises] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const { userData } = useContext(AppContext);

  const [selectedItems, setSelectedItems] = useState([]);

  //  // TODO ADD TRY CATCH ON EVERY FUNCTION
  useEffect(() => {
    const fetchExercises = async () => {
      const result = await getExercises();
      const filtered = Object.entries(result)
        .map(([exerciseId, exercise]) => ({
          id: exerciseId,
          ...exercise,
        }))
        .filter(
          (exercise) =>
            exercise.categoryId === id &&
            exercise.createdBy === userData.username
        );
      setExercises(filtered);
    };

    fetchExercises();
  }, [category]);

  const handleToggle = async (itemId) => {
    await deleteExercise(itemId);
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
      console.log(selectedItems);
    } else {
      setSelectedItems([...selectedItems, itemId]);
      console.log(selectedItems);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>
        Exercises for Category: {category}
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className='card bg-base-100 shadow-xl p-4 flex flex-col'
          >
            <div className='card-body'>
              <h3 className='card-title text-lg font-bold'>{exercise.title}</h3>
              <p>
                <strong>Content:</strong> {exercise.content}
              </p>
              <p>
                <strong>Calories:</strong> {exercise.calories}
              </p>
              <p>
                <strong>Level:</strong> {exercise.level}
              </p>
            </div>
            <div className='card-actions justify-end'>
              <div className='flex flex-row gap-3'>
                <button
                  onClick={() => setCurrentId(exercise.createdBy)}
                  className='btn btn-primary'
                >
                  Add to list
                </button>
                <button
                  className='btn btn-primary'
                  onClick={() => handleToggle(exercise.id)}
                  variant={
                    selectedItems.includes(exercise.id)
                      ? 'contained'
                      : 'outlined'
                  }
                >
                  Delete
                </button>
                {/* <Modal
                  message={'Are you sure u want to delete the post ?'}
                  action={'Delete'}
                  onClickFunc={handleToggle}
                  exercise={exercise}
                  variant={
                    selectedItems.includes(exercise.id)
                      ? 'contained'
                      : 'outlined'
                  }
                /> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={setSelectedCategory} className='btn btn-primary mt-4'>
        Back
      </button>
    </div>
  );
};
