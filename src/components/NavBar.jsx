import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { logoutUser } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const { setAppState, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = async () => {
    await logoutUser();
    setAppState({ user: null, userData: null });
    console.log('After', userData);
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
        <button onClick={logout}>Logout</button>
      )}
      {userData && <p>{userData?.email}</p>}
      {console.log('Before', userData)}
    </div>
  );
};
