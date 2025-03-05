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
import FilterTimerModal from './FilterTimerModal/FilterTimerModal';

const HomeScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timerList, setTimerList] = useState<TimerCategory[]>([]);
  const [isFilterTimer, setIsFilterTimer] = useState(false);
  const [filteredTimers, setFilteredTimers] = useState<TimerCategory[]>([]);
  const [selectedItems,setSelectedItems] = useState<any[]>([])

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
    setFilteredTimers(updatedTimers);
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
        <CustomButton
          title="Filter-Timer"
          onPress={() => setIsFilterTimer(true)}
          width={120}
          bgColor="transparent"
          textColor="#333"
        />
        <ViewPermission isVisible={isVisible}>
          <AddTimerModal
            headerText="Add Timer"
            onClose={() => setIsVisible(false)}
            timerList={timerList}
            setTimerList={setTimerList}
            filteredTimers={filteredTimers}
            setFilteredTimers={setFilteredTimers}
          />
        </ViewPermission>
        <ViewPermission isVisible={isFilterTimer}>
          <FilterTimerModal
            headerText="Filter Timer"
            onClose={() => setIsFilterTimer(false)}
            timerList={timerList}
            setTimerList={setFilteredTimers}
            setSelectedCategory={setSelectedItems}
            selectedCategory={selectedItems}
          />
        </ViewPermission>
        <AccordianTimer
          timerList={filteredTimers}
          setTimerList={setFilteredTimers}
        />
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
