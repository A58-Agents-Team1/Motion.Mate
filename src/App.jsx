import { auth } from './config/firebase-config';
import { Layout } from './hoc/Layout';
import { AppContext } from './context/AppContext';
import { getUserData } from './services/users.service';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Home from './views/Home';
import About from './views/About';
import Login from './components/Login/Login';
import Register from './views/Register';
import NotFound from './views/NotFound';
import MyProfile from './views/MyProfile';
import Authenticated from './hoc/Authenticated';

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
            <Route
              path='/'
              element={
                <Authenticated user={user}>
                  <Home />
                </Authenticated>
              }
            />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
            <Route
              path='/my-profile'
              element={
                <Authenticated user={user}>
                  <MyProfile />
                </Authenticated>
              }
            />
          </Routes>
        </Layout>
      </AppContext.Provider>
    </>
  );
}

export default App;
