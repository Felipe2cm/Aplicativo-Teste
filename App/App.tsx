import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Main from './src/Main';

import { useFonts, RobotoSlab_500Medium } from '@expo-google-fonts/roboto-slab';
import AppLoading from 'expo-app-loading';

import AppProvider from './src/hooks';

export default function App() {
  let [fontsLoaded] = useFonts({
    RobotoSlab_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <>
    <AppProvider>
      <NavigationContainer>
        <Main/>
      </NavigationContainer>
    </AppProvider>
    </>
  )
  }
}
