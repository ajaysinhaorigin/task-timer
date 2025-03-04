import React, {FC, useEffect, useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';

type Props = {
  navigation?: any;
};

const SplashScreen: FC<Props> = ({navigation}: Props) => {
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    //clear timeout
    if (timer) {
      clearTimeout(timer);
    }
    const timeout = setTimeout(() => {
      navigateToApp();
    }, 1000);
    setTimer(timeout);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  //navigation to screens based on authentication
  const navigateToApp = (): void => {
    const nextRoute = 'TimerRoute';
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: 'RootRoutes', params: {nextRoute}}],
    });
    navigation?.dispatch(resetAction);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
      }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View style={styles.logoContainer}>
        <Text
          style={{
            marginVertical: 20,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Welcome to the app
        </Text>
        <Text
          style={{
            marginVertical: 20,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Timer
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  splashScreenImg: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
