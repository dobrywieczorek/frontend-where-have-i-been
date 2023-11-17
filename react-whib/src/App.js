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

const Root = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/test">Test</Link>

        <div>
          <Outlet />
        </div>
      </div>
    </>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index path='/profile' element={<UserProfile />}/>
      <Route path='/test' element={<Test />} />
    </Route>
  )
)

function App() {
  return (
    <div className="App">
      
      <Sidebar />
      <RouterProvider router={router}/>
      {/*
      <UserProfile />
      */}
    </div>
  );
}

export default App;
