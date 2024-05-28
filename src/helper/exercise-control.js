export const handleRemoveFromList = async (
  removeExerciseInProgress,
  id,
  setAlertMessage,
  setShowSuccess,
  setShowError,

  alertHelper,
  message
) => {
  try {
    await removeExerciseInProgress(id);
    alertHelper(setAlertMessage, setShowSuccess, message);
  } catch (error) {
    alertHelper(setAlertMessage, setShowError, error.message);
  }
};

export const handleAddToList = async (
  id,
  addExerciseInProgress,
  alertHelper,
  setAlertMessage,
  setShowSuccess,
  setShowError,

  message
) => {
  try {
    await addExerciseInProgress(id);
    alertHelper(setAlertMessage, setShowSuccess, message);
  } catch (error) {
    alertHelper(setAlertMessage, setShowError, error.message);
  }
};

export const handleDelete = async (
  itemId,
  deleteExercise,
  alertHelper,
  setAlertMessage,
  setShowSuccess,
  setShowError,
  message
) => {
  try {
    await deleteExercise(itemId);
    alertHelper(setAlertMessage, setShowSuccess, message);
  } catch (error) {
    alertHelper(setAlertMessage, setShowError, error.message);
  }
};

export const startEditing = (exercise, setEditingExerciseId, setEditForm) => {
  setEditingExerciseId(exercise.id);
  setEditForm({
    title: exercise.title,
    content: exercise.content,
    calories: exercise.calories,
    level: exercise.level,
  });
};

export const submitEdit = async (
  exerciseId,
  editForm,
  editExercise,
  setAlertMessage,
  setShowSuccess,
  setEditingExerciseId,
  setShowError
) => {
  try {
    await editExercise(exerciseId, editForm);
    setAlertMessage('Exercise updated successfully!');
    setShowSuccess(true);
    setEditingExerciseId(null);
  } catch (error) {
    setAlertMessage('Failed to update exercise.');
    setShowError(true);
  }
};
