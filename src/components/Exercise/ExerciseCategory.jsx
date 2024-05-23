import { useEffect, useState } from 'react';

export const ExerciseCategory = ({
  category,
  onBackToMain,
  allPosts,
  startTimer,
  timer,
  setTimer,
  setStartTimer,
}) => {
  const [duration, setDuration] = useState([]);

  const getDuration = (post) => {
    setDuration(post.duration);
  };

  // TODO if we want the input to be selected if its hours or minutes or seconds
  useEffect(() => {
    if (duration.includes('hour')) {
      const countHours = duration.split(' ');
      setTimer(Number(countHours[0]) * 3600);
    }
    if (duration.includes('minute')) {
      const countHours = duration.split(' ');
      setTimer(Number(countHours[0]) * 60);
    }
    if (duration.includes('seconds')) {
      const countHours = duration.split(' ');
      setTimer(Number(countHours[0]));
    }
    console.log(timer);
    setStartTimer(true);
  }, [duration]);

  return (
    <div>
      {allPosts.map((post) => (
        <div key={post.id}>
          {post.category === category && (
            <div className='indicator'>
              <div className='indicator-item indicator-bottom'>
                <button
                  className='btn btn-outline btn-primary'
                  onClick={() => getDuration(post)}
                >
                  Start
                </button>
              </div>
              <div className='card border'>
                <div className='card-body'>
                  <h2 className='card-title'>{post.title}</h2>
                  <p>{post.shortDescription}</p>
                  <p>{post.description}</p>
                  <p>{post.duration}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <button onClick={onBackToMain} className='btn btn-secondary'>
        Back
      </button>
    </div>
  );
};
