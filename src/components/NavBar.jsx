import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext.js';
import { useContext } from 'react';
import { logoutUser } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const { setAppState, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    await logoutUser();
    setAppState({ user: null, userData: null });
    navigate('/');
  };

  return (
    <div className='flex flex-row gap-2 justify-center align-middle  '>
      <NavLink to={'/'}>Home</NavLink>
      <NavLink to={'/about'}>About</NavLink>
      {!userData ? (
        <>
          <NavLink to={'/login'}>Login</NavLink>
          <NavLink to={'/register'}>Register</NavLink>
        </>
      ) : (
        <button onClick={(e) => logout(e)}>Logout</button>
      )}
      {userData && <p>{userData?.email}</p>}
    </div>
  );
};
