import 'react-native-gesture-handler';
import React from 'react';
import AppNavContainer from './src/navigations'
import GlobalProvider from "./src/context/Provider";



export default function App() {
  return (
    <GlobalProvider>
      <AppNavContainer />
    </GlobalProvider>
  );
}


