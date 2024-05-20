import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { getExercises } from '../services/exercise.service';
import { CreateExercise } from './CreateExercise';
import { onChildChanged, ref } from 'firebase/database';
import { db } from '../config/firebase-config';

export const Exercise = () => {
  const { userData } = useContext(AppContext);

  const [allPosts, setAllPosts] = useState([]);

  const getAllExercises = async () => {
    const result = await getExercises();
    setAllPosts(result);
  };
  getAllExercises();

  useEffect(() => {
    return onChildChanged(ref(db, 'exercises'), (snapshot) => {
      const value = snapshot.val();
      setAllPosts((allPosts) =>
        allPosts.map((exercise) => {
          return exercise;
        })
      );
    });
  }, []);

  return (
    <>
      <CreateExercise />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 '>
        {allPosts.length > 0 &&
          allPosts.map((post) => (
            <div
              className='card w-64 bg-base-100 shadow-xl image-full'
              key={post.id}
            >
              <figure>
                <img src={`src/assets/${post.title}.jpg`} alt='Shoes' />
              </figure>
              <div className='card-body'>
                <h2 className='card-title'>{post.title}</h2>
                <p>{post.duration}</p>
                <p>{post.shortDescription}</p>

                <div className='card-actions justify-end'>
                  <button className='btn btn-primary'>Join Now</button>
                </div>
                <p className='text-primary uppercase bg-neutral-600/70'>
                  Level : {post.level}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
