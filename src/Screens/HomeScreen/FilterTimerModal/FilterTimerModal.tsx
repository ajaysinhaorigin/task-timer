import React from 'react';
import {CustomButton, CustomModal, FlexBox} from '../../../components';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CheckIcon} from '../../../assets';

interface Props {
  onClose: () => void;
  headerText: string;
  timerList: any[];
  setTimerList: any;
  selectedCategory: any[];
  setSelectedCategory: any;
}

export default function FilterTimerModal({
  headerText,
  onClose,
  timerList,
  setTimerList,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  // const [selectedCategory, setSelectedCategory] = useState<any[]>([]);

  const handleSelect = (categoryId: string) => {
    setSelectedCategory(
      (prevSelected: any) =>
        prevSelected.includes(categoryId)
          ? prevSelected.filter((id: any) => id !== categoryId) // Remove if already selected
          : [...prevSelected, categoryId], // Add if not selected
    );
  };

  const handleDone = () => {
    const filteredTimers = timerList.filter(timer =>
      selectedCategory.includes(timer.id),
    );
    if (!filteredTimers.length) {
      setTimerList(timerList); // Update timerList with selected items
      onClose(); // Close modal
      return;
    }
    setTimerList(filteredTimers); // Update timerList with selected items
    onClose(); // Close modal
  };

  return (
    <CustomModal headerText={headerText} modalVisible={true} onClose={onClose}>
      <View>
        {timerList.map(category => (
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
