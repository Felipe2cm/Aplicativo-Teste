import React from 'react';

import GlobasStyle from './styles/global';
import SignIn from './pages/SignIn';  
import SignUp from './pages/SignUp';  

const App: React.FC = () => {
  return (
    <>
    <SignIn/>
    <GlobasStyle/>
    </>
  );
}

export default App;
