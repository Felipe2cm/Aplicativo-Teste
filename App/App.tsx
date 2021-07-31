import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/Main';

import { useFonts, RobotoSlab_500Medium } from '@expo-google-fonts/roboto-slab';
import AppLoading from 'expo-app-loading';

export default function App() {
  let [fontsLoaded] = useFonts({
    RobotoSlab_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <NavigationContainer>
      <Main/>
    </NavigationContainer>
  )
  }
}
