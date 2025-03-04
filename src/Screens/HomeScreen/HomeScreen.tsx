import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  AccordianTimer,
  CustomButton,
  FlexBox,
  LayoutWrapper,
  ViewPermission,
} from '../../components';
import AddTimerModal from './AddTimerModal/AddTimerModal';
import {asyncStorage} from '../../services';
import {TimerCategory} from '../../Interfaces';

const HomeScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timerList, setTimerList] = useState<TimerCategory[]>([]);

  useEffect(() => {
    getTimerList();
  }, []);

  const getTimerList = async () => {
    const storedTimers = (await asyncStorage.getTimerList()) as TimerCategory[];

    if (!Boolean(storedTimers.length)) {
      return setTimerList(storedTimers || []);
    }

    const updatedTimers = storedTimers.map(category => ({
      ...category,
      isExpanded: false,
      isCategoryRunning: false,
      timers: category.timers.map(timer => ({
        ...timer,
        isRunning: false,
      })),
    }));

    console.log('updatedTimers', updatedTimers);
    setTimerList(updatedTimers);
  };

  return (
    <LayoutWrapper>
      <View>
        <FlexBox
          direction="row"
          justifyContent="space-between"
          marginHorizontal={8}>
          <Text style={styles.heading}>Timer Dashboard</Text>
          <CustomButton
            title="Add Timer"
            onPress={() => setIsVisible(true)}
            width={120}
          />
        </FlexBox>
        <ViewPermission isVisible={isVisible}>
          <AddTimerModal
            headerText="Add Timer"
            onClose={() => setIsVisible(false)}
            timerList={timerList}
            setTimerList={setTimerList}
          />
        </ViewPermission>
        <AccordianTimer timerList={timerList} setTimerList={setTimerList} />
      </View>
    </LayoutWrapper>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  btnBox: {
    backgroundColor: '#111',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnContent: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  heading: {fontSize: 18, fontWeight: '600', color: 'black'},
});
