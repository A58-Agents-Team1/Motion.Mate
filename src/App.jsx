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
import Index from './views/Index';

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
              path='/Motion.Mate'
              element={<Index />}
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
              path='/register-additional-info'
              element={<RegisterAdditionalInfo />}
            />
            <Route
              path='*'
              element={<NotFound />}
            />
            <Route
              path='/contact-us'
              element={<ContactUs />}
            />
            <Route
              path='/wellness-health-tools'
              element={
                <Authenticated user={user}>
                  <WellnessHealthTools />
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
              path='/goals/:id'
              element={
                <Authenticated user={user}>
                  <DetailedGoal />
                </Authenticated>
              }
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
              path='/exercises/:category'
              element={
                <Authenticated user={user}>
                  <Exercises />
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
            <Route
              path='/admin-panel'
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
