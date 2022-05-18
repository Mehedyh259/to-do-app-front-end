import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import NavigationBar from './components/shared/NavigationBar';
import NotFound from './components/shared/NotFound';
import ToDo from './components/ToDo/ToDo';

function App() {
  return (
    <div className='px-2 lg:px-12'>
      <NavigationBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todo' element={<ToDo />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='*' element={<NotFound />} />
      </Routes>


      <ToastContainer />

    </div>
  );
}

export default App;


