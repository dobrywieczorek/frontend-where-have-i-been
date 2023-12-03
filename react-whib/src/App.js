import './css/App.css';
import './components/UserProfile';
import UserProfile from './components/UserProfile';
import Sidebar from './components/Sidebar';
import Test from './components/Test';
import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider
} from 'react-router-dom'
import Error404 from './components/Error404';
import LoginPanel from './Pages/LoginPanel';
import RegisterPanel from './Pages/RegisterPanel';

import { UserContext } from './contexts/AuthContext';
import PrivateRoutes from './components/PrivateRoutes';


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
        <Route path='/profile' element={<UserProfile />}/>
      </Route>
      <Route path='/test' element={<Test />} />
      <Route path='*' element={<Error404 />}></Route>
      <Route path='/login' element={<LoginPanel />}></Route>
      <Route path='/register' element={<RegisterPanel />}> </Route>
    </Route>
  )
)

export default function App() {
  const [token, setToken] = useState(null)

  useEffect(()=>{
    setToken(localStorage.getItem('access_token'))
  }, [token])
  
  return (
    <div className="App">
      <UserContext.Provider value={{token, setToken}}>
        <RouterProvider router={router}/>
      </UserContext.Provider>
    </div>
  );
}

