import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { createExercises } from '../services/exercise.service';
import { addUserExercise } from '../services/users.service';

export const CreateExercise = () => {
  const [content, setContent] = useState({
    title: '',
    duration: '',
    description: '',
    level: '',
    createdBy: '',
    shortDescription: '',
  });
  const { userData } = useContext(AppContext);
  const [show, setShow] = useState(false);

  const updateContent = (e, prop) => {
    setContent({
      ...content,
      [prop]: e,
    });
  };

  const submitExercise = async () => {
    const result = await createExercises(
      content.title,
      content.duration,
      content.description,
      content.level,
      userData?.username,
      content.shortDescription
    );
    setContent({});
    console.log(result);

    await addUserExercise(userData.username, result);
    console.log(content.createdBy);
    setShow(!show);
  };

  return (
    <div className=' flex justify-end'>
      <div className='flex gap-36 '>
        <button className='btn btn-outline btn-secondary '>Set Goals</button>
        <button
          onClick={() => setShow(!show)}
          className='btn btn-outline btn-primary '
        >
          Create exercise
        </button>
      </div>

      {show && (
        <div className=''>
          <label className='input input-bordered flex items-center gap-2 select-primary'>
            <input
              onChange={(e) => updateContent(e.target.value, 'title')}
              type='text'
              className='grow'
              placeholder='Title'
              value={content.title}
            />
          </label>
          <label className='input input-bordered flex items-center gap-2 select-primary'>
            <input
              onChange={(e) => updateContent(e.target.value, 'duration')}
              type='text'
              className='grow'
              placeholder='Duration'
              value={content.duration}
            />
          </label>
          <label className='input input-bordered flex items-center gap-2 select-primary'>
            <input
              onChange={(e) => updateContent(e.target.value, 'description')}
              type='text'
              className='grow'
              placeholder='description'
              value={content.description}
            />
          </label>
          <label className='input input-bordered flex items-center gap-2 select-primary'>
            <input
              onChange={(e) => updateContent(e.target.value, 'level')}
              type='text'
              className='grow'
              placeholder='Level'
              value={content.level}
            />
          </label>
          <label className='input input-bordered flex items-center gap-2 select-primary'>
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
          <button
            onClick={submitExercise}
            className='btn btn-outline btn-primary'
          >
            Submit
          </button>
          {/* <button
            onClick={setShow(!show)}
            className='btn btn-outline btn-secondary'
          >
            Cancel
          </button> */}
        </div>
      )}
    </div>
  );
};
