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
import { getFriends } from '../services/users.service';
import { FriendAvatar } from '../components/Exercise/FriendAvatar';
import { ExerciseCard } from '../components/Exercise/ExerciseCard';

export const Exercises = ({ category, id, setSelectedCategory }) => {
  const [exercises, setExercises] = useState([]);
  const { userData } = useContext(AppContext);
  const [showError, setShowError] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState(null);
  const [friends, setFriends] = useState();
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    calories: '',
    level: '',
  });

  useEffect(() => {
    const fetchFriends = async () => {
      const snapshot = await getFriends(userData?.username);
      setFriends(snapshot);
    };
    fetchFriends();
  }, []);

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
      const exerciseByFriend = friends?.map((friend) => {
        return allExercises.filter(
          (exercise) =>
            exercise?.categoryId === id && exercise?.createdBy === friend
        );
      });

      const flatten = exerciseByFriend?.filter((arr) => arr.length > 0).flat();
      if (flatten?.length > 0) {
        setExercises(filtered.concat(flatten));
      } else {
        setExercises(filtered);
      }
    });
  }, [friends]);

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
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div
              key={exercise.id}
              className={
                userData.username === exercise.createdBy
                  ? 'card bg-base-100 shadow-xl p-4 flex flex-col w-full'
                  : 'card  shadow-xl p-4 flex flex-col w-full bg-base-300'
              }
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
                  <ExerciseCard exercise={exercise} userData={userData} />
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
                    {exercise.createdBy === userData.username && (
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
                    )}
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
          ))
        ) : (
          <div className='text-2xl font-bold mb-4'>
            Add personal exercises to see them here! Enroll in different
            workouts and challenge yourself!
          </div>
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
