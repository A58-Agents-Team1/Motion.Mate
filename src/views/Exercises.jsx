import { useContext, useEffect, useState } from 'react';
import {
  addExerciseInProgress,
  deleteExercise,
  getExercises,
} from '../services/exercise.service';
import { AppContext } from '../context/AppContext';
import { onValue, ref } from 'firebase/database';
import { db } from '../config/firebase-config';

export const Exercises = ({ category, id, setSelectedCategory }) => {
  const [exercises, setExercises] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const { userData } = useContext(AppContext);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleDelete = async (itemId) => {
    await deleteExercise(itemId);
  };

  useEffect(() => {
    return onValue(ref(db, 'exercises'), (snapshot) => {
      const allExercises = [];
      snapshot.forEach((child) => {
        allExercises.push({
          id: child.key,
          ...child.val(),
        });
      });
      const filtered = allExercises.filter(
        (exercise) =>
          exercise.categoryId === id && exercise.createdBy === userData.username
      );
      setExercises(filtered);
    });
  }, []);

  const handleJoin = async (id) => {
    await addExerciseInProgress(id);

    if (currentId.includes(id)) {
      setCurrentId(currentId.filter((id) => id !== itemId));
      console.log(currentId);
    } else {
      setCurrentId([...currentId, id]);
      console.log(currentId);
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
                  onClick={() => handleJoin(exercise.id)}
                  className='btn btn-primary'
                >
                  Add to list
                </button>
                <button
                  className='btn btn-primary'
                  onClick={() => handleDelete(exercise.id)}
                >
                  Delete
                </button>
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
