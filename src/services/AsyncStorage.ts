import AsyncStorage from '@react-native-async-storage/async-storage';
import {TimerCategory} from '../Interfaces';

const setTimerList = async (timerList: TimerCategory[]) => {
  try {
    await AsyncStorage.setItem('timersList', JSON.stringify(timerList));
  } catch (error) {}
};

const getTimerList = async () => {
  try {
    const timerList = await AsyncStorage.getItem('timersList');
    if (timerList !== null) {
      return JSON.parse(timerList);
    }
    return [];
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return [];
  }
};

// const setCompletedTimerList = async (timerList: any) => {
//   try {
//     await AsyncStorage.setItem(
//       'completedTimersList',
//       JSON.stringify(timerList),
//     );
//   } catch (error) {}
// };

// const getCompletedTimerList = async () => {
//   try {
//     const completedTimersList = await AsyncStorage.getItem(
//       'completedTimersList',
//     );
//     if (completedTimersList !== null) {
//       return JSON.parse(completedTimersList);
//     }
//     return [];
//   } catch (error) {
//     console.error('Error retrieving access token:', error);
//     return [];
//   }
// };

const clearStorage = async () => {
  try {
    const timerList = await AsyncStorage.clear();
    return [];
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return [];
  }
};

export const asyncStorage = {
  setTimerList,
  getTimerList,
  clearStorage,
  // setCompletedTimerList,
  // getCompletedTimerList,
};
