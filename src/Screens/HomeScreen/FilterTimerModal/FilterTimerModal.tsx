import React from 'react';
import {CustomButton, CustomModal, FlexBox} from '../../../components';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CheckIcon} from '../../../assets';
import {TimerCategory} from '../../../Interfaces';

interface Props {
  onClose: () => void;
  headerText: string;
  timerList: any[];
  setTimerList: any;
  selectedCategory: any[];
  setSelectedCategory: any;
  filteredTimersList: TimerCategory[];
}

export default function FilterTimerModal({
  headerText,
  onClose,
  timerList,
  setTimerList,
  selectedCategory,
  setSelectedCategory,
  filteredTimersList,
}: Props) {
  const handleSelect = (categoryId: number) => {
    setSelectedCategory((prevSelected: any) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id: any) => id !== categoryId)
        : [...prevSelected, categoryId],
    );
  };

  const handleDone = () => {
    const filteredTimers = timerList.filter(timer =>
      selectedCategory.includes(timer.id),
    );
    if (!filteredTimers.length) {
      setTimerList(timerList);
      onClose(); // Close modal
      return;
    }
    setTimerList(filteredTimers);
    onClose(); // Close modal
  };

  return (
    <CustomModal headerText={headerText} modalVisible={true} onClose={onClose}>
      <View style={{marginVertical: 10}}>
        {filteredTimersList.map(category => (
          <TouchableOpacity
            key={category.id}
            style={styles.filterCard}
            onPress={() => handleSelect(category.id)}>
            <FlexBox direction="row" justifyContent="space-between">
              <Text>{category.categoryName}</Text>
              {selectedCategory.includes(category.id) && (
                <View style={styles.iconWrapper}>
                  <Image source={CheckIcon} style={styles.icon} />
                </View>
              )}
            </FlexBox>
          </TouchableOpacity>
        ))}
      </View>

      <CustomButton title="Done" onPress={handleDone} />
    </CustomModal>
  );
}

export const styles = StyleSheet.create({
  filterCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconWrapper: {
    width: 25,
    height: 25,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  doneText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
