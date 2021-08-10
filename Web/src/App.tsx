import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobasStyle from './styles/global';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import AppProvider from './hooks';
import ToastContainer from './components/ToastContainer';

import Routes from './routes';

const App: React.FC = () => {

  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobasStyle />
    </Router>
  );
}

export default App;
