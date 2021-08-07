import React from 'react';

import GlobasStyle from './styles/global';
import SignIn from './pages/SignIn';  
import SignUp from './pages/SignUp';  

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {  

  return (
    <>
    <GlobasStyle/>
    <AuthProvider>
    <SignIn/>
    </AuthProvider>
    </>
  );
}

export default App;
