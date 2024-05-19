import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';

export const Layout = ({ children }) => {
  return (
    <div className='flex flex-col justify-between w-full border min-h-[100vh]'>
      <NavBar />
      <div className='flex justify-center align-middle'>{children}</div>
      <Footer />
    </div>
  );
};
