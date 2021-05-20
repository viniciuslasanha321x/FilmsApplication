import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MoviesProvider from './components/Context/favoritesMovies';
import 'react-toastify/dist/ReactToastify.min.css';

import './App.css';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <MoviesProvider>
        <Routes />
        <ToastContainer autoClose={2500} className="toast-container" />
      </MoviesProvider>
    </>
  );
};

export default App;
