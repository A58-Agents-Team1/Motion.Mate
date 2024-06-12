import { auth } from './config/firebase-config';
import { Layout } from './hoc/Layout/Layout';
import { AppContext } from './context/AppContext';
import { getUserData } from './services/users.service';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Exercises } from './views/Exercises/Exercises';
import Login from './components/Login/Login';
import Register from './views/Register/Register';
import NotFound from './views/NotFound/NotFound';
import MyProfile from './views/MyProfile/MyProfile';
import Authenticated from './hoc/Authenticated/Authenticated';
import AllUsers from './views/AllUsers/AllUsers';
import Goals from './views/Goals/Goals';
import FullProfileView from './views/FullProfileView/FullProfileView';
import MyFriends from './views/MyFriends/MyFriends';
import Categories from './components/Categories/Categories';
import AdminPanel from './views/AdminPanel/AdminPanel';
import DetailedGoal from './components/Goals/DetailedGoal';
import ContactUs from './views/ContactUs/ContactUs';
import RegisterAdditionalInfo from './views/RegisterAdditionalInfo/RegisterAdditionalInfo';
import WellnessHealthTools from './views/WellnessAndHealthTools/WellnessAndHealthTools';
import About from './views/About/About';
import Home from './views/Home/Home';
import { BASE } from './common/constants';

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
              path={`${BASE}`}
              element={<Home />}
            />
            <Route
              path={`${BASE}about`}
              element={<About />}
            />
            <Route
              path={`${BASE}login`}
              element={<Login />}
            />
            <Route
              path={`${BASE}register`}
              element={<Register />}
            />
            <Route
              path={`${BASE}register-additional-info`}
              element={<RegisterAdditionalInfo />}
            />
            <Route
              path={`${BASE}*`}
              element={<NotFound />}
            />
            <Route
              path={`${BASE}contact-us`}
              element={<ContactUs />}
            />
            <Route
              path={`${BASE}logo.png`}
              element={
                <img
                  src='/assets/logo.png'
                  alt='logo'
                  style={{ display: 'none' }}
                />
              }
            />
            <Route
              path={`${BASE}wellness-health-tools`}
              element={
                <Authenticated user={user}>
                  <WellnessHealthTools />
                </Authenticated>
              }
            />
            <Route
              path={`${BASE}goals`}
              element={
                <Authenticated user={user}>
                  <Goals />
                </Authenticated>
              }
            />
            <Route
              path={`${BASE}goals/:id`}
              element={
                <Authenticated user={user}>
                  <DetailedGoal />
                </Authenticated>
              }
            />
            <Route
              path={`${BASE}all-users`}
              element={
                <Authenticated user={user}>
                  <AllUsers />
                </Authenticated>
              }
            />
            <Route
              path={`${BASE}my-friends`}
              element={
                <Authenticated user={user}>
                  <MyFriends />
                </Authenticated>
              }
            />
            <Route
              path={`${BASE}users/:id`}
              element={
                <Authenticated user={user}>
                  <FullProfileView />
                </Authenticated>
              }
            />
            <Route
              path={`${BASE}my-profile`}
              element={
                <Authenticated user={user}>
                  <MyProfile />
                </Authenticated>
              }
            />
            <Route
              path={`${BASE}exercises/:category`}
              element={
                <Authenticated user={user}>
                  <Exercises />
                </Authenticated>
              }
            />
            <Route
              path={`${BASE}exercises`}
              element={
                <Authenticated user={user}>
                  <Categories />
                </Authenticated>
              }
            />
            <Route
              path={`${BASE}admin-panel`}
              element={
                <Authenticated user={user}>
                  <AdminPanel />
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
