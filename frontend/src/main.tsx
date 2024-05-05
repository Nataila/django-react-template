import ReactDOM from 'react-dom/client'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import ProfilePage from './pages/ProfilePage';


const PrivateRouter = ({children}) => {
  const token = localStorage.getItem('token')
  
  if (!token) {
    return <Navigate to="/signin" replace />
  } else {
    return children
  }
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRouter> <MainPage /></PrivateRouter>,
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className="root">
    <RouterProvider router={router} />
  </div>
)
