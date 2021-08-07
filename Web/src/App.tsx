import React from 'react';

import GlobasStyle from './styles/global';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import ToastContainer from './components/ToastContainer';
import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => {

  return (
    <>
    <AuthProvider>
    <SignIn/>
    </AuthProvider>

    <ToastContainer/>

    <GlobasStyle/>
    </>
  );
}

export default App;
