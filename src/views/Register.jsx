import { useState } from 'react';
import {
  createUser,
  getUploadedPhoto,
  uploadPhoto,
} from '../services/users.service';
import { registerUser } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const updateForm = (props) => (e) => {
    setForm({
      ...form,
      [props]: e.target.value,
    });
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      setImage(files[0]);
    }
  };

  const register = async (event) => {
    event.preventDefault();

    const userCredential = await registerUser(form.email, form.password);

    let url;
    if (image) {
      await uploadPhoto(image, form.username);
      url = await getUploadedPhoto(form.username);
    }

    await createUser(
      userCredential.user.uid,
      form.username,
      form.email,
      form.phoneNumber,
      form.firstName,
      form.lastName,
      url || ''
    );
    navigate('/');
  };

  return (
    <>
      <div id='register' className='hero min-h-screen bg-base-300'>
        <div className='hero-content flex-col lg:flex-row-reverse'>
          <div className='text-center lg:text-left'>
            <h1 className='text-5xl font-bold'>Register!</h1>
            <p className='py-6'>Join our journey!</p>
          </div>
          <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <form className='card-body '>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>First Name</span>
                </label>
                <input
                  onChange={updateForm('firstName')}
                  type='text'
                  placeholder='First Name'
                  className='input input-bordered'
                  value={form.firstName}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Last Name</span>
                </label>
                <input
                  onChange={updateForm('lastName')}
                  type='text'
                  placeholder='Last Name'
                  className='input input-bordered'
                  value={form.lastName}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Username</span>
                </label>
                <input
                  onChange={updateForm('username')}
                  type='text'
                  placeholder='username'
                  className='input input-bordered'
                  required
                  value={form.username}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  onChange={updateForm('email')}
                  type='email'
                  placeholder='email'
                  className='input input-bordered'
                  required
                  value={form.email}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Phone</span>
                </label>
                <input
                  onChange={updateForm('phoneNumber')}
                  type='string'
                  placeholder='+359 123-456-789'
                  className='input input-bordered'
                  required
                  value={form.phoneNumber || ''}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  onChange={updateForm('password')}
                  type='password'
                  placeholder='password'
                  className='input input-bordered'
                  required
                  value={form.password}
                />
                <label className='label'>
                  <a href='#' className='label-text-alt link link-hover'>
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Upload Photo</span>
                </label>
                <input
                  onChange={handleFileChange}
                  type='file'
                  accept='image/*'
                  placeholder='avatar'
                  className='file-input w-full max-w-xs'
                />
              </div>
              <div className='form-control mt-6'>
                <button onClick={register} className='btn btn-primary '>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
