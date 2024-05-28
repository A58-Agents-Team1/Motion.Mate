import { useContext, useEffect, useState } from 'react';
import {
  addExerciseInProgress,
  deleteExercise,
  editExercise,
  removeExerciseInProgress,
} from '../services/exercise.service';
import { AppContext } from '../context/AppContext';
import { onValue, ref } from 'firebase/database';
import { db } from '../config/firebase-config';
import { alertHelper } from '../helper/alert-helper';
import AlertError from '../components/Alerts/AlertError';
import AlertSuccess from '../components/Alerts/AlertSuccess';
import {
  handleAddToList,
  handleDelete,
  handleRemoveFromList,
  startEditing,
  submitEdit,
} from '../helper/exercise-control';

export const Exercises = ({ category, id, setSelectedCategory }) => {
  const [exercises, setExercises] = useState([]);
  const { userData } = useContext(AppContext);
  const [showError, setShowError] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    calories: '',
    level: '',
  });

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

  const cancelEditing = () => {
    setEditingExerciseId(null);
    setEditForm({
      title: '',
      content: '',
      calories: '',
      level: '',
    });
  };

  const handleEditFormChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>
        Exercises for Category: {category}
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2'>
        {exercises.length > 0 ? (
          <div>
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className='card bg-base-100 shadow-xl p-4 flex flex-col w-full sm:w-[320px] md:w-[400px]'
              >
                <div className='card-body'>
                  {editingExerciseId === exercise.id ? (
                    <>
                      <input
                        type='text'
                        name='title'
                        value={editForm.title}
                        onChange={handleEditFormChange}
                        className='input input-bordered mb-2'
                      />
                      <textarea
                        name='content'
                        value={editForm.content}
                        onChange={handleEditFormChange}
                        className='textarea textarea-bordered mb-2'
                      />
                      <input
                        type='text'
                        name='calories'
                        value={editForm.calories}
                        onChange={handleEditFormChange}
                        className='input input-bordered mb-2'
                      />
                      <input
                        type='text'
                        name='level'
                        value={editForm.level}
                        onChange={handleEditFormChange}
                        className='input input-bordered mb-2'
                      />
                    </>
                  ) : (
                    <>
                      <h3 className='card-title text-lg font-bold '>
                        {exercise.title}
                      </h3>
                      <div className='grid grid-cols-2 gap-6'>
                        <div className='text-lg'>
                          <p>
                            <strong className='text-primary '>Content:</strong>{' '}
                            {exercise.content}
                          </p>
                          <p>
                            <strong className='text-primary '>Calories:</strong>{' '}
                            {exercise.calories}
                          </p>
                          <p>
                            <strong className='text-primary '>Level:</strong>{' '}
                            {exercise.level}
                          </p>
                        </div>
                        <div>
                          <p className='text-text-lg'>
                            <strong className='text-primary '>Duration:</strong>
                            <br />
                            <strong className='text-primary '>
                              Hours:
                            </strong>{' '}
                            {exercise.duration?.hours}
                            <br />
                            <strong className='text-primary '>
                              Minutes:
                            </strong>{' '}
                            {exercise.duration?.minutes}
                            <br />
                            <strong className='text-primary '>
                              Seconds:
                            </strong>{' '}
                            {exercise.duration?.seconds}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className='card-actions justify-end'>
                  {editingExerciseId === exercise.id ? (
                    <div className='flex flex-row gap-3'>
                      <button
                        onClick={() =>
                          submitEdit(
                            exercise.id,
                            editForm,
                            editExercise,
                            setAlertMessage,
                            setShowSuccess,
                            setEditingExerciseId,
                            setShowError
                          )
                        }
                        className='btn btn-primary'
                      >
                        Submit
                      </button>
                      <button
                        onClick={cancelEditing}
                        className='btn btn-secondary'
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className='flex flex-row gap-3'>
                      {exercise?.inProgress ? (
                        <button
                          onClick={() =>
                            handleRemoveFromList(
                              removeExerciseInProgress,
                              exercise.id,
                              setAlertMessage,
                              setShowSuccess,
                              setShowError,
                              alertHelper,
                              'Exercise removed from list!'
                            )
                          }
                          className='btn btn-primary'
                        >
                          Remove from list
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleAddToList(
                              exercise.id,
                              addExerciseInProgress,
                              alertHelper,
                              setAlertMessage,
                              setShowSuccess,
                              setShowError,
                              'Exercise added in list!'
                            )
                          }
                          className='btn btn-primary'
                        >
                          Add to list
                        </button>
                      )}
                      <button
                        onClick={() =>
                          startEditing(
                            exercise,
                            setEditingExerciseId,
                            setEditForm
                          )
                        }
                        className='btn btn-primary'
                      >
                        Edit
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() =>
                      handleDelete(
                        exercise.id,
                        deleteExercise,
                        alertHelper,
                        setAlertMessage,
                        setShowSuccess,
                        setShowError,
                        'Exercise deleted!'
                      )
                    }
                    className='btn btn-square btn-outline'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className='text-2xl font-bold mb-4'>
              Add personal exercises to see them here! Enroll in different
              workouts and challenge yourself!
            </div>
          </>
        )}

        {showError && <AlertError message={alertMessage} />}
        {showSuccess && <AlertSuccess message={alertMessage} />}
      </div>
      <button onClick={setSelectedCategory} className='btn btn-primary mt-4'>
        Back
      </button>
    </div>
  );
};
