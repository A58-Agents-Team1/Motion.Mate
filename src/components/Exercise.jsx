import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { getExercises } from '../services/exercise.service';
import { onChildChanged, ref } from 'firebase/database';
import { db } from '../config/firebase-config';
import { ExerciseCategory } from './Exercise.Category';
import { AccountStats } from './Account.Stats';

export const Exercise = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState(null);

  useEffect(() => {
    getExercises().then(setAllPosts);
    // console.log(selectedCategory);
  }, [selectedCategory]);

  //   useEffect(() => {
  //   return onChildChanged(ref(db, 'exercises'), (snapshot) => {
  //     const value = snapshot.val();
  //     setAllPosts((allPosts) =>
  //       allPosts.map((exercise) => {
  //         return exercise;
  //       })
  //     );
  //   });
  // }, []);

  const handleBackToMain = () => {
    setSelectedCategory(false);
  };

  return (
    <>
      {selectedCategory === false && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
          {allPosts.length > 0 &&
            allPosts.map((post) => (
              <div
                className='card w-64 bg-base-100 shadow-xl image-full'
                key={post.id}
              >
                <figure>
                  <img src={`src/assets/${post?.category}.jpg`} alt='Shoes' />
                </figure>
                <div className='card-body'>
                  <h2 className='card-title'>{post.category}</h2>
                  <p>{post.title}</p>
                  <p>{post.shortDescription}</p>

                  <button
                    onClick={() => setSelectedCategory(post.category)}
                    className='btn btn-primary'
                  >
                    Join Now
                  </button>
                </div>
                <p>Level : {post.level}</p>
              </div>
            ))}
        </div>
      )}

      {selectedCategory && (
        <div>
          <h1>Selected Category: {selectedCategory}</h1>
          <ExerciseCategory
            category={selectedCategory}
            onBackToMain={handleBackToMain}
            allPosts={allPosts}
          />
        </div>
      )}
    </>
  );
};
