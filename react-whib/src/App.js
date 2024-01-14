import './css/App.css';
import UserProfile from './Pages/UserProfile';
import Sidebar from './components/Sidebar';
import Test from './components/Test';
import EditUser from './components/EditUser';
import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider,
  Navigate
} from 'react-router-dom'
import Error404 from './components/Error404';
import LoginPanel from './Pages/LoginPanel';
import RegisterPanel from './Pages/RegisterPanel';
import UserSearchPanel from './Pages/UserSearchPanel';
import MapView from './Pages/MapView';
import FriendList from './Pages/Friends';

import { UserContext } from './contexts/AuthContext';
import PrivateRoutes from './components/PrivateRoutes';

import { GoogleLogin } from '@react-oauth/google';

import GoogleCallback from "./GoogleCallback";
import FacebookCallback from "./FacebookCallback";

const Root = () => {
  return (
    <>
      <div className='Root-outlet'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route element={<PrivateRoutes />}>
        <Route path='/home' element={<UserProfile />} />
        <Route path='/' element={<UserProfile />} />
        <Route path='profile' element={<UserProfile />} />
        <Route path='/profile/:profileId' element={<UserProfile />}/>
      </Route>
      <Route path='/test' element={<Test />} />
      <Route path='*' element={<Error404 />}></Route>
      <Route path='/login' element={<LoginPanel />}></Route>
      <Route path='/register' element={<RegisterPanel />}> </Route>
      <Route path='/usersearch' element={<UserSearchPanel />}></Route>
      <Route path='/map' element={<MapView />}> </Route>
      <Route path='/settings' element={<EditUser/>}> </Route>
      <Route path='/friends' element={<FriendList />}/>
      <Route path="/auth/google" element={<GoogleCallback />}></Route>
      <Route path="/auth/facebook" element={<FacebookCallback />}></Route>
    </Route>
  )
)

export default function App() {
  const [token, setToken] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(()=>{
    setToken(localStorage.getItem('access_token'))
    setLoading(false)
  }, [token])
  
  return (
    <div className="App">
      <UserContext.Provider value={{token, setToken, isLoading}}>
        <RouterProvider router={router}/>
      </UserContext.Provider>
    </div>
  );
}

