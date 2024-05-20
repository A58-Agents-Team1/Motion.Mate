import { Route, Routes } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import Home from './views/Home';
import About from './views/About';
import Login from './views/Login';
import Register from './views/Register';
import NotFound from './views/NotFound';
import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserData } from './services/users.service';
import { auth } from './config/firebase-config';
import { Layout } from './hoc/Layout';
import MyProfile from './views/MyProfile';

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });
  const { refresh } = useContext(AppContext);
  const [user] = useAuthState(auth);

  if (appState.user !== user) {
    setAppState({ ...appState, user });
  }

  useEffect(() => {
    if (!appState.user) return;

    getUserData(appState.user.uid).then((snapshot) => {
      const userData = Object.values(snapshot.val())[0];
      setAppState({ ...appState, userData });
      console.log('userData', userData);
    });
  }, [refresh, appState.user]);

  return (
    <>
      <AppContext.Provider value={{ ...appState, setAppState }}>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/my-profile' element={<MyProfile />} />
          </Routes>
        </Layout>
      </AppContext.Provider>
    </>
  );
}

export default App;
