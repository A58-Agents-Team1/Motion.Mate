import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { createExercises } from '../services/exercise.service';
import { addUserExercise } from '../services/users.service';

export const CreateExercise = () => {
  const [content, setContent] = useState({
    category: '',
    title: '',
    duration: '',
    description: '',
    level: '',
    createdBy: '',
    shortDescription: '',
  });
  const { userData } = useContext(AppContext);

  const updateContent = (e, prop) => {
    setContent({
      ...content,
      [prop]: e,
    });
  };

  const submitExercise = async () => {
    const result = await createExercises(
      content.category,
      content.title,
      content.duration,
      content.description,
      content.level,
      userData?.username,
      content.shortDescription
    );
    setContent({
      category: '',
      title: '',
      duration: '',
      description: '',
      level: '',
      createdBy: '',
      shortDescription: '',
    });
    console.log(result);

    await addUserExercise(userData.username, result);
    console.log(content.createdBy);
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
        <dialog id='exercise-create-modal' className='modal'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg mb-3'>Ready to workout</h3>

            <select
              className='select select-info w-full max-w-xs mb-3'
              value={content.category}
              onChange={(e) => updateContent(e.target.value, 'category')}
            >
              <option disabled value=''>
                Select Category
              </option>
              <option value='Yoga'>Yoga</option>
              <option value='Jog'>Jog</option>
              <option value='Abb Workout'>Abb Workout</option>
            </select>

            <label className='input input-bordered flex items-center mb-3 select-primary'>
              <input
                onChange={(e) => updateContent(e.target.value, 'title')}
                type='text'
                className='grow'
                placeholder='Title'
                value={content.title}
              />
            </label>

            <label className='input input-bordered flex items-center mb-3 select-primary'>
              <input
                onChange={(e) => updateContent(e.target.value, 'duration')}
                type='text'
                className='grow'
                placeholder='Duration'
                value={content.duration}
              />
            </label>

            <label className='input input-bordered flex items-center mb-3 select-primary'>
              <input
                onChange={(e) => updateContent(e.target.value, 'description')}
                type='text'
                className='grow'
                placeholder='description'
                value={content.description}
              />
            </label>

            <label className='input input-bordered flex items-center mb-3 select-primary'>
              <input
                onChange={(e) => updateContent(e.target.value, 'level')}
                type='text'
                className='grow'
                placeholder='Level'
                value={content.level}
              />
            </label>

            <label className='input input-bordered flex items-center mb-3 select-primary'>
              <input
                onChange={(e) =>
                  updateContent(e.target.value, 'shortDescription')
                }
                type='text'
                className='grow'
                placeholder='Short description'
                value={content.shortDescription}
              />
            </label>

            <form method='dialog'>
              <button
                onClick={submitExercise}
                className='btn btn-outline btn-primary'
              >
                Submit
              </button>
            </form>

            <div className='modal-action'>
              <form method='dialog'>
                <button className='btn btn-outline btn-primary'>Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};
