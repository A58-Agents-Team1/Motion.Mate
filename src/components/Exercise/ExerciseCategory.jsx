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
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const getDuration = (post) => {
    const hours = Number(post.duration.split(' ')[0]);
    const minutes = Number(post.duration.split(' ')[2]);
    const seconds = Number(post.duration.split(' ')[4]);
    setDuration({ hours, minutes, seconds });
  };

  // TODO if we want the input to be selected if its hours or minutes or seconds
  useEffect(() => {
    console.log('timer', timer, duration.hours);
    setTimer(
      timer + duration.hours * 3600 + duration.minutes * 60 + duration.seconds
    );

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
