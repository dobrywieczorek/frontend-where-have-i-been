import './css/App.css';
import './components/UserProfile';
import UserProfile from './components/UserProfile';
import Sidebar from './components/Sidebar';
import Test from './components/Test';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider
} from 'react-router-dom'
import Error404 from './components/Error404';

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
    </Route>
  )
)

function App() {
  return (
    <div className="App">
      
      
      <RouterProvider router={router}/>
      {/*
      <UserProfile />
      */}
    </div>
  );
}

export default App;
