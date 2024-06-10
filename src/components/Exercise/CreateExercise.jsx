import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { createExercises } from '../../services/exercise.service';
import { addUserExercise } from '../../services/users.service';
import { getAllCategories } from '../../services/category.service';
import { validateExerciseForm } from '../../common/exercise.validations';
import AlertError from '../../components/Alerts/AlertError';
import AlertSuccess from '../../components/Alerts/AlertSuccess';
import { alertHelper } from '../../helper/alert-helper';

export const CreateExercise = () => {
  const { userData } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [takeResult, setTakeResult] = useState([]);
  const [content, setContent] = useState({
    title: '',
    content: '',
    hours: 0,
    minutes: 0,
    seconds: 0,
    calories: '',
    level: '',
    categoryId: '',
  });

  useEffect(() => {
    const getCategories = async () => {
      const result = await getAllCategories();
      setCategories(result);
    };
    getCategories();
  }, []);

  const updateContent = (e, prop) => {
    setContent({
      ...content,
      [prop]: e,
    });
  };

  const submitExercise = async () => {
    try {
      validateExerciseForm(
        content.title,
        content.content,
        content.hours,
        content.minutes,
        content.seconds,
        content.calories,
        content.level,
        selectedCategoryId
      );
      const result = await createExercises(
        selectedCategoryId,
        content.title,
        content.content,
        content.hours,
        content.minutes,
        content.seconds,
        content.calories,
        content.level,
        userData.username
      );
      setTakeResult(result);

      setContent({
        title: '',
        content: '',
        hours: 0,
        minutes: 0,
        seconds: 0,
        calories: '',
        level: '',
        categoryId: '',
      });

      document.getElementById('exercise-create-modal').close();
      alertHelper(
        setAlertMessage,
        setShowSuccess,
        'Successfully created exercise!'
      );
    } catch (error) {
      alertHelper(setAlertMessage, setShowError, error.message);
    }

    await addUserExercise(userData.username, takeResult);
  };

  return (
    <div>
      <button
        className='btn btn-outline btn-primary'
        onClick={() =>
          document.getElementById('exercise-create-modal').showModal()
        }
      >
        Create Exercise
      </button>
      <div>
        <dialog
          id='exercise-create-modal'
          className='modal'
        >
          <div className='modal-box overflow-x-hidden'>
            <h3 className='font-bold text-lg mb-3'>Ready to workout</h3>
            <label className='input input-bordered flex items-center mb-3 select-primary'>
              <input
                onChange={(e) => updateContent(e.target.value, 'title')}
                type='text'
                className='grow'
                placeholder='title'
                value={content.title}
              />
            </label>
            <label className='input input-bordered flex items-center mb-3 select-primary'>
              <input
                onChange={(e) => updateContent(e.target.value, 'content')}
                type='text'
                className='grow'
                placeholder='Content'
                value={content.content}
              />
            </label>
            <div className='flex gap-2'>
              <label className='input input-bordered w-1/3 flex items-center mb-3 select-primary'>
                <input
                  onChange={(e) => updateContent(e.target.value, 'hours')}
                  type='number'
                  className='grow'
                  placeholder='Hours'
                  value={content.hours}
                />
              </label>

              <label className='input input-bordered w-1/3 flex items-center mb-3 select-primary'>
                <input
                  onChange={(e) => updateContent(e.target.value, 'minutes')}
                  type='number'
                  className='grow'
                  placeholder='Minutes'
                  value={content.minutes}
                />
              </label>

              <label className='input input-bordered w-1/3 flex items-center mb-3 select-primary'>
                <input
                  onChange={(e) => updateContent(e.target.value, 'seconds')}
                  type='number'
                  className='grow'
                  placeholder='Seconds'
                  value={content.seconds}
                />
              </label>
            </div>
            <select
              className='select  w-full max-w-xs mb-3 text-primary select-primary '
              value={content.level}
              onChange={(e) => updateContent(e.target.value, 'level')}
            >
              <option
                disabled
                value=''
              >
                Select level
              </option>
              <option value='Easy'>Easy</option>
              <option value='Medium'>Medium</option>
              <option value='Hard'>Hard</option>
            </select>

            <select
              className='select select-primary w-full max-w-xs mb-3 text-primary'
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              <option
                disabled
                value=''
              >
                Select category
              </option>
              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.category}
                >
                  {cat.category}
                </option>
              ))}
            </select>

            <label className='input input-bordered w-1/3 flex items-center mb-3 select-primary'>
              <input
                onChange={(e) => updateContent(e.target.value, 'calories')}
                type='number'
                className='grow'
                placeholder='calories'
                value={content.calories}
              />
            </label>

            <div className='flex items-center justify-between'>
              <div className='modal-action mt-1'>
                <form method='dialog'>
                  <button className='btn btn-outline btn-primary'>
                    Cancel
                  </button>
                </form>
              </div>
              <form method='dialog'>
                <button
                  onClick={submitExercise}
                  className='btn btn-outline btn-primary'
                  type='button'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>
        {showError && <AlertError message={alertMessage} />}
        {showSuccess && <AlertSuccess message='Exercise Created!' />}
      </div>
    </div>
  );
};
