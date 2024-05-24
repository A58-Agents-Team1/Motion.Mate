import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser, loginUserByUsername } from '../../services/auth.service.js';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext.js';
import { Link } from 'react-router-dom';
import LoginBy from './LoginBy.jsx';
import {
  validateEmailLogAsync,
  validatePassword,
  validateRequiredFieldsLogEmail,
  validateRequiredFieldsLogUsername,
  validateUserNameLogAsync,
} from '../../common/user.validations.js';

export default function Login() {
  const { setAppState, user, refresh } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [usernameEmail, setUsernameEmail] = useState(true);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const updateForm = (props) => (e) => {
    setForm({
      ...form,
      [props]: e.target.value,
    });
  };

  const validateLoginFormByEmail = async () => {
    validateRequiredFieldsLogEmail(form);
    await validateEmailLogAsync(form.email);
    validatePassword(form.password);
  };

  const validateLoginFormByUsername = async () => {
    validateRequiredFieldsLogUsername(form);
    await validateUserNameLogAsync(form.username);
    validatePassword(form.password);
  };

  const handleLoginByEmail = async () => {
    try {
      await validateLoginFormByEmail();
      const { user } = await loginUser(form.email, form.password);
      setAppState({ user, userData: null, refresh: !refresh });
      navigate(location.state.from.pathname || '/');
    } catch (error) {
      if (error.message.includes('auth/invalid-credential')) {
        console.log('Wrong password!');
        return;
      }
      console.log(error.message);
    }
  };

  const handleLoginByUsername = async () => {
    try {
      await validateLoginFormByUsername();
      await loginUserByUsername(form.username, form.password);
      setAppState({ user, userData: null, refresh: !refresh });
      navigate(location.state.from.pathname || '/');
    } catch (error) {
      if (error.message.includes('auth/invalid-credential')) {
        console.log('Wrong password!');
        return;
      }
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login) {
      setUsernameEmail(JSON.parse(login));
    }
  }, []);

  return (
    <div id='login' className='hero min-h-screen bg-base-300'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <form className='card-body'>
            <h2 className='card-title'>Login</h2>
            {usernameEmail && (
              <LoginBy
                placeholder='Username'
                type='text'
                form={form.username}
                updateForm={updateForm}
                handleLogin={handleLoginByUsername}
              />
            )}
            {!usernameEmail && (
              <LoginBy
                placeholder='Email'
                type='email'
                form={form.email}
                updateForm={updateForm}
                handleLogin={handleLoginByEmail}
              />
            )}
          </form>
          <div className='flex gap-2 snap-center justify-center mb-7 '>
            <label htmlFor='username'>Username</label>
            <input
              type='radio'
              name='radio-btn'
              className='radio radio-accent'
              onChange={() => {
                setUsernameEmail((prev) => (prev = !prev));
                localStorage.setItem('login', true);
              }}
              checked={usernameEmail}
            />
            <label htmlFor='email'>Email</label>
            <input
              type='radio'
              name='radio-btn'
              className='radio radio-accent'
              onChange={() => {
                setUsernameEmail((prev) => (prev = !prev));
                localStorage.setItem('login', false);
              }}
              checked={!usernameEmail}
            />
          </div>
          <div className='flex align-middle justify-center text-center lg:text-left'>
            <p className='py-6'>
              Don`t have an account?
              <Link
                to='/register'
                className='link link-hover text-accent-700 font-bold ml-1'
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
