import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth.service';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext.js';

export default function Login() {
  const { setAppState, user, refresh } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const updateForm = (props) => (e) => {
    setForm({
      ...form,
      [props]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      // console.log('From Form: ', form);

      const { user } = await loginUser(form.email, form.password);
      console.log(user, form.email, form.password);
      // console.log('From User: ', user);

      setAppState({ user, userData: null, refresh: !refresh });
      // navigate(location.state.from.pathname || '/');
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div id='login' className='hero min-h-screen bg-base-300'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>Login now!</h1>
          <p className='py-6'>Don`t have an account ? Register</p>
          <a href='#register' className='btn btn-primary'>
            Register
          </a>
        </div>
        <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <form className='card-body'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='email'
                className='input input-bordered'
                value={form.email}
                onChange={updateForm('email')}
                required
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type='password'
                placeholder='password'
                className='input input-bordered'
                value={form.password}
                onChange={updateForm('password')}
                required
              />
              <label className='label'>
                <a href='#' className='label-text-alt link link-hover'>
                  Forgot password?
                </a>
              </label>
            </div>
            <div className='form-control mt-6'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
