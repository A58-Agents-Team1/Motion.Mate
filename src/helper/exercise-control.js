export const handleRemoveFromList = async (
  removeExerciseInProgress,
  categoryName,
  id,
  setAlertMessage,
  setShowSuccess,
  setShowError,

  alertHelper,
  message
) => {
  try {
    await removeExerciseInProgress(categoryName, id);
    alertHelper(setAlertMessage, setShowSuccess, message);
  } catch (error) {
    alertHelper(setAlertMessage, setShowError, error.message);
  }
};

export const handleAddToList = async (
  categoryName,
  id,
  addExerciseInProgress,
  alertHelper,
  setAlertMessage,
  setShowSuccess,
  setShowError,

  message
) => {
  try {
    await addExerciseInProgress(categoryName, id);
    alertHelper(setAlertMessage, setShowSuccess, message);
  } catch (error) {
    alertHelper(setAlertMessage, setShowError, error.message);
  }
};

export const handleDelete = async (
  categoryName,
  itemId,
  deleteExercise,
  alertHelper,
  setAlertMessage,
  setShowSuccess,
  setShowError,
  message
) => {
  try {
    await deleteExercise(categoryName, itemId);
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
  categoryName,
  exerciseId,
  editForm,
  editExercise,
  setAlertMessage,
  setShowSuccess,
  setEditingExerciseId,
  setShowError
) => {
  try {
    await editExercise(categoryName, exerciseId, editForm);
    setAlertMessage('Exercise updated successfully!');
    setShowSuccess(true);
    setEditingExerciseId(null);
  } catch (error) {
    setAlertMessage(error.message);
    setShowError(true);
  }
};
