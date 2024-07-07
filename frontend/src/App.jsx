import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails';
import ErrorPage from '../src/pages/Error';
import Landing from './pages/Landing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'user-details', element: <UserDetails /> },
      { path: 'landing', element: <Landing /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
