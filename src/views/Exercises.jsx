import { useContext, useEffect, useState } from 'react';
import {
  addExerciseInProgress,
  deleteExercise,
} from '../services/exercise.service';
import { AppContext } from '../context/AppContext';
import { onValue, ref } from 'firebase/database';
import { db } from '../config/firebase-config';
import { alertHelper } from '../helper/alert-helper';
import AlertError from '../components/Alerts/AlertError';
import AlertSuccess from '../components/Alerts/AlertSuccess';

export const Exercises = ({ category, id, setSelectedCategory }) => {
  const [exercises, setExercises] = useState([]);
  const { userData } = useContext(AppContext);
  const [showError, setShowError] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDelete = async (itemId) => {
    try {
      await deleteExercise(itemId);
      alertHelper(
        setAlertMessage,
        setShowSuccess,
        'Successfully deleted exercise!'
      );
    } catch (error) {
      alertHelper(setAlertMessage, setShowError, error.message);
    }
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

  const handleAddToList = async (id) => {
    try {
      await addExerciseInProgress(id);
      alertHelper(
        setAlertMessage,
        setShowSuccess,
        'Successfully added exercise!'
      );
    } catch (error) {
      alertHelper(setAlertMessage, setShowError, error.message);
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
                  onClick={() => handleAddToList(exercise.id)}
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
        {showError && <AlertError message={alertMessage} />}
        {showSuccess && (
          <AlertSuccess message='Successfully deleted exercise!' />
        )}
      </div>
      <button onClick={setSelectedCategory} className='btn btn-primary mt-4'>
        Back
      </button>
    </div>
  );
};
