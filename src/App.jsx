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
import AllUsers from './views/AllUsers';
import Goals from './views/Goals';
import FullProfileView from './views/FullProfileView';
import BodyMassIndex from './views/BodyMassIndex';
import MyFriends from './views/MyFriends';
import Categories from './components/Categories/Categories';
import DetailedGoal from './components/Goals/DetailedGoal';

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

    getUserData(appState.user.uid)
      .then((snapshot) => {
        if (snapshot.val()) {
          const userData = Object.values(snapshot.val())[0];
          setAppState({ ...appState, userData });
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [refresh, appState.user]);

  return (
    <>
      <AppContext.Provider value={{ ...appState, setAppState }}>
        <Layout>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/about'
              element={<About />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/register'
              element={<Register />}
            />
            <Route
              path='*'
              element={<NotFound />}
            />
            <Route
              path='/BMI'
              element={
                <Authenticated user={user}>
                  <BodyMassIndex />
                </Authenticated>
              }
            />
            <Route
              path='/goals'
              element={
                <Authenticated user={user}>
                  <Goals />
                </Authenticated>
              }
            />
            <Route
              path='/about'
              element={<About />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/register'
              element={<Register />}
            />
            <Route
              path='*'
              element={<NotFound />}
            />
            <Route
              path='/all-users'
              element={
                <Authenticated user={user}>
                  <AllUsers />
                </Authenticated>
              }
            />
            <Route
              path='/my-friends'
              element={
                <Authenticated user={user}>
                  <MyFriends />
                </Authenticated>
              }
            />
            <Route
              path='/users/:id'
              element={
                <Authenticated user={user}>
                  <FullProfileView />
                </Authenticated>
              }
            />
            <Route
              path='/my-profile'
              element={
                <Authenticated user={user}>
                  <MyProfile />
                </Authenticated>
              }
            />
            <Route
              path='/exercises'
              element={
                <Authenticated user={user}>
                  <Categories />
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
