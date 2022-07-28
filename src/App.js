import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/Explore'
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute';
import Category from './pages/Category';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          // nested route to ensure we are logged in
          <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/category/:categoryName' element={<Category />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
