export const ExerciseCategory = ({ category, onBackToMain, allPosts }) => {
  return (
    <div>
      {allPosts.map((post) => (
        <div key={post.id}>
          {post.category === category && (
            <div className='indicator'>
              <div className='indicator-item indicator-bottom'>
                <button className='btn btn-outline btn-primary'>Start</button>
              </div>
              <div className='card border'>
                <div className='card-body'>
                  <h2 className='card-title'>{post.title}</h2>
                  <p>{post.shortDescription}</p>
                  <p>{post.description}</p>
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
