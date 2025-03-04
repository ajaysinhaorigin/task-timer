import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LaunchRoutes} from './navigations/AppRoutes';
import FlashMessage from 'react-native-flash-message';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <LaunchRoutes />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

export default App;
