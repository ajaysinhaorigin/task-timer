import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LaunchRoutes} from './navigations/AppRoutes';
import FlashMessage from 'react-native-flash-message';
import {asyncStorage} from './services';

function App(): React.JSX.Element {
  // useEffect(() => {
  //   const clearStorage = async () => {
  //     await asyncStorage.clearStorage();
  //   };
  //   clearStorage();
  // }, []);
  return (
    <NavigationContainer>
      <LaunchRoutes />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

export default App;
