import { useContext, useState } from 'react';
import { createCategory } from '../../services/category.service';
import {
  uploadCategoryPhoto,
  getCategoryPhoto,
} from '../../services/users.service';

const CreateCategory = ({ onCategoryCreated }) => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState({
    name: '',
    description: '',
  });

  const updateCategory = (e, prop) => {
    setCategory({
      ...category,
      [prop]: e.target.value,
    });
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      setImage(files[0]);
    }
  };

  const submitCategory = async () => {
    let url;
    if (image) {
      url = await uploadCategoryPhoto(image, category.name);
    }
    const catUrl = await getCategoryPhoto(category.name);
    await createCategory(category.name, category.description, catUrl);
    onCategoryCreated();
  };

  return (
    <div>
      <button
        className='btn btn-outline btn-primary'
        onClick={() =>
          document.getElementById('category-create-modal').showModal()
        }
      >
        Create Category
      </button>

      <dialog id='category-create-modal' className='modal'>
        <div className='modal-box '>
          <h3 className='font-bold text-lg mb-3'>Create New Category</h3>

          <label className='input input-bordered flex items-center mb-3 select-primary'>
            <input
              type='text'
              className='grow'
              placeholder='Name'
              value={category.name}
              onChange={(e) => updateCategory(e, 'name')}
            />
          </label>
          <label className='input input-bordered flex items-center mb-3 select-primary'>
            <input
              type='text'
              className='grow'
              placeholder='Description'
              value={category.description}
              onChange={(e) => updateCategory(e, 'description')}
            />
          </label>

          <label className='input input-bordered flex items-center mb-3 select-primary'>
            <input
              type='file'
              accept='image/*'
              className='grow'
              onChange={handleFileChange}
            />
          </label>
          <div className='flex flex-row gap-6'>
            <button
              className='btn btn-outline btn-primary'
              onClick={submitCategory}
            >
              Create
            </button>
            <form method='dialog'>
              <button className='btn btn-outline btn-primary'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateCategory;
