import { NavBar } from '../../components/Navigation/NavBar';
import { Footer } from '../../components/Footer/Footer';
import PropTypes from 'prop-types';

export const Layout = ({ children }) => {
  return (
    <div className='flex flex-col w-full min-h-[100vh]'>
      <NavBar />
      <div className='flex flex-col self-center justify-center my-3 w-10/12'>
        {children}
      </div>
      <div className='flex-1'></div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
