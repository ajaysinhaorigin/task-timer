import {ReactElement} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TimerRoute} from './TimerRoutes';
import {SplashScreen} from '../Screens';

export function createAllNavStackNavigator() {
  return createNativeStackNavigator();
}

const RootStack = createAllNavStackNavigator();
const LaunchStack = createAllNavStackNavigator();

export function RootRoutes(): ReactElement {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="TimerRoute" component={TimerRoute} />
    </RootStack.Navigator>
  );
}

export function LaunchRoutes(): ReactElement {
  return (
    <LaunchStack.Navigator screenOptions={{headerShown: false}}>
      <LaunchStack.Screen name="Splash" component={SplashScreen} />
      <LaunchStack.Screen name="RootRoutes" component={RootRoutes} />
    </LaunchStack.Navigator>
  );
}
