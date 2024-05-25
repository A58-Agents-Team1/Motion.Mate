import { useEffect, useState } from 'react';

import { getAllCategories } from '../../services/category.service';
import CreateCategory from '../Categories/CreateCategory';
import { CreateExercise } from './CreateExercise';
import { Exercises } from '../../views/Exercises';

const Categories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [id, setId] = useState('');

  const getIdSetCategory = (category) => {
    setSelectedCategory(category.category);
    setId(category.id);
  };

  // TODO ADD TRY CATCH ON EVERY FUNCTION
  const fetchCategories = async () => {
    const snapshot = await getAllCategories();
    setAllCategories(snapshot);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='flex flex-col'>
      {selectedCategory ? (
        <Exercises
          category={selectedCategory}
          id={id}
          setSelectedCategory={() => setSelectedCategory('')}
        />
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
            {allCategories.length > 0 &&
              allCategories.map((category) => (
                <div
                  className='card w-64 bg-base-100 shadow-xl image-full'
                  key={category.id}
                >
                  <figure>
                    <img src={category.imageUrl} alt={category.category} />
                  </figure>
                  <div className='card-body'>
                    <h2 className='card-title'>{category.category}</h2>
                    <p>{category.description}</p>
                    <button
                      onClick={() => getIdSetCategory(category)}
                      className='btn btn-primary'
                    >
                      Join Now
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <CreateCategory onCategoryCreated={fetchCategories} />
          <CreateExercise />
        </>
      )}
    </div>
  );
};

export default Categories;
