import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <Routes />
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default App;
