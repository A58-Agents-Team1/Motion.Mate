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
import AlertSuccess from '../Alerts/AlertSuccess/AlertSuccess.jsx';
import AlertError from '../Alerts/AlertError/AlertError.jsx';
import { alertHelper } from '../../helper/alert-helper.js';

export default function Login() {
  const { setAppState, user, refresh } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);
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
      alertHelper(setMessage, setSuccess, 'User login successfully!');
      navigate(location.state.from.pathname || '/');
    } catch (error) {
      if (error.message.includes('auth/invalid-credential')) {
        alertHelper(setMessage, setAlert, 'Wrong Password!');
        return;
      }
      alertHelper(setMessage, setAlert, error.message);
    }
  };

  const handleLoginByUsername = async () => {
    try {
      await validateLoginFormByUsername();
      await loginUserByUsername(form.username, form.password);
      setAppState({ user, userData: null, refresh: !refresh });
      alertHelper(setMessage, setSuccess, 'User login successfully!');
      navigate(location.state.from.pathname || '/');
    } catch (error) {
      if (error.message.includes('auth/invalid-credential')) {
        alertHelper(setMessage, setAlert, 'Wrong Password!');
        return;
      }
      alertHelper(setMessage, setAlert, error.message);
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
    <div
      id='login'
      className='hero min-h-screen bg-base-300'
    >
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>Login!</h1>
          <p className='py-6'>Join our journey!</p>
        </div>
        <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <form className='card-body'>
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
      {success && <AlertSuccess message={message} />}
      {alert && <AlertError message={message} />}
    </div>
  );
}
