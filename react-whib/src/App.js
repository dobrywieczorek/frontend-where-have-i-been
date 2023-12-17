import './css/App.css';
import './components/UserProfile';
import UserProfile from './components/UserProfile';
import Sidebar from './components/Sidebar';
import Test from './components/Test';
import EditUser from './components/EditUser';
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
import UserSearchPanel from './Pages/UserSearchPanel';
import MapView from './Pages/MapView';

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
    <Route path="/" element={<Root />}>
      
      <Route index path='/profile' element={<UserProfile />}/>
      <Route path='/test' element={<Test />} />
      <Route path='*' element={<Error404 />}></Route>
      <Route path='/login' element={<LoginPanel />}></Route>
      <Route path='/register' element={<RegisterPanel />}> </Route>
      <Route path='/usersearch' element={<UserSearchPanel />}></Route>
      <Route path='/map' element={<MapView />}> </Route>
      <Route path='/edit' element={<EditUser/>}> </Route>
    </Route>
  )
)

export default function App() {
  return (
    <div className="App">
      
      
      <RouterProvider router={router}/>
      {/*
      <UserProfile />
      */}
    </div>
  );
}

