import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <div>
      <NavLink to={'/'}>Home</NavLink>
      <NavLink to={'/about'}>About</NavLink>
      <NavLink to={'/login'}>Login</NavLink>
      <NavLink to={'/register'}>Register</NavLink>
    </div>
  );
};
