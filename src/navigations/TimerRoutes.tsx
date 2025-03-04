import React, {ReactElement} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN} from './Screens';
import {HistoryScreen, HomeScreen} from '../Screens';

export function createAllStackNavigator() {
  return createNativeStackNavigator();
}
const TimerStack = createAllStackNavigator();

export function TimerRoute(): ReactElement {
  return (
    <TimerStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={SCREEN.HOME}>
      <TimerStack.Screen name={SCREEN.HOME} component={HomeScreen} />
      <TimerStack.Screen name={SCREEN.HISTORY} component={HistoryScreen} />
    </TimerStack.Navigator>
  );
}
