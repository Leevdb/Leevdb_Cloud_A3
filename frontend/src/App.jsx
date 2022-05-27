import { Route, Routes } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import NotFound from './components/errors/notFound';
import Layout from './routes/layout';
import Login from './routes/login';
import Main from './routes/main';
import Register from './routes/register';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme='dark'
      />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
