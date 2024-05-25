import { useContext, useState } from 'react';
import { createCategory } from '../../services/category.service';
import {
  uploadCategoryPhoto,
  getCategoryPhoto,
} from '../../services/users.service';
import { AppContext } from '../../context/AppContext';

const CreateCategory = ({ onCategoryCreated }) => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState({
    name: '',
    description: '',
  });
  const { userData } = useContext(AppContext);

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
        <div className='modal-box'>
          <h3 className='font-bold text-lg mb-3'>Create New Category</h3>

          <label className='input input-bordered flex items-center mb-3'>
            <input
              type='text'
              className='grow'
              placeholder='Name'
              value={category.name}
              onChange={(e) => updateCategory(e, 'name')}
            />
          </label>
          <label className='input input-bordered flex items-center mb-3'>
            <input
              type='text'
              className='grow'
              placeholder='Description'
              value={category.description}
              onChange={(e) => updateCategory(e, 'description')}
            />
          </label>

          <label className='input input-bordered flex items-center mb-3'>
            <input
              type='file'
              accept='image/*'
              className='grow'
              onChange={handleFileChange}
            />
          </label>

          <button className='btn btn-primary' onClick={submitCategory}>
            Create
          </button>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn'>Close</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CreateCategory;
