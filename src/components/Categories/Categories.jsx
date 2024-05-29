import { useEffect, useState } from 'react';
import {
  deleteCategory,
  getAllCategories,
} from '../../services/category.service';
import CreateCategory from './CreateCategory';
import { CreateExercise } from '../Exercise/CreateExercise';
import { Exercises } from '../../views/Exercises';
import { DeleteIcon } from './DeleteIcon';

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

  const handleDelete = async (category) => {
    await deleteCategory(category.category, category.id);
  };

  useEffect(() => {
    fetchCategories();
  }, [allCategories]);
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
          <div className='mb-6'>
            <h1 className='text-3xl font-bold'>
              Here you can browse through different category exercises. <br />{' '}
              <br /> You can also{' '}
              <span className='inline-block'>
                <CreateCategory onCategoryCreated={fetchCategories} />
              </span>{' '}
              and{' '}
              <span className='inline-block'>
                <CreateExercise />
              </span>
            </h1>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
            {allCategories.length > 0 &&
              allCategories.map((category) => (
                <div
                  className='card w-64 bg-base-100 shadow-xl image-full relative'
                  key={category.id}
                >
                  <figure>
                    <img src={category.imageUrl} alt={category.category} />
                  </figure>
                  <div className='card-body text-xl'>
                    <button
                      onClick={() => handleDelete(category)}
                      className='absolute top-2 right-2'
                    >
                      <DeleteIcon />
                    </button>
                    <h2 className='card-title'>{category.category}</h2>
                    <p>{category.description}</p>
                    <div className='flex flex-row'></div>
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
        </>
      )}
    </div>
  );
};

export default Categories;
