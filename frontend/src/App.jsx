import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails';
import ErrorPage from '../src/pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'home', element: <HomePage /> },
      { path: 'user-details', element: <UserDetails /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
