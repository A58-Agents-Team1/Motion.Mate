import { NavBar } from '../components/Navigation/NavBar';
import { Footer } from '../components/Footer';
import { propTypes } from 'prop-types';

export const Layout = ({ children }) => {
  return (
    <div className='flex flex-col justify-between w-full border min-h-[100vh]'>
      <NavBar />
      <div className='flex justify-center align-middle'>{children}</div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: propTypes.any.isRequired,
};
