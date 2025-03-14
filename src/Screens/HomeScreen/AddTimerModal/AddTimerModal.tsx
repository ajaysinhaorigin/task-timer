import React, {useState} from 'react';
import {
  CustomButton,
  CustomInput,
  CustomModal,
  CustomRadioButton,
  ToastMessage,
} from '../../../components';
import {generateId} from '../../../Utilities';
import {asyncStorage} from '../../../services';

interface Props {
  onClose: () => void;
  headerText: string;
  timerList: any[];
  setTimerList: any;
  filteredTimers: any[];
  setFilteredTimers: any;
}

export default function AddTimerModal({
  headerText,
  onClose,
  timerList,
  setTimerList,
  filteredTimers,
  setFilteredTimers,
}: Props) {
  const [timer, setTimer] = useState({
    timerName: '',
    duration: '',
    category: '',
    alertHalfway: false,
  });

  const onAddTimer = async () => {
    const newTimer = {
      ...timer,
      id: generateId(5),
      duration: Number(timer.duration),
      remaininTime: Number(timer.duration),
      isRunning: false,
      isCompleted: false,
    };

    const isCategoryExists = timerList.some(
      item => item.categoryName === newTimer.category,
    );

    if (!isCategoryExists) {
      const updatedList = [
        ...timerList,
        {
          id: generateId(5),
          categoryName: newTimer.category,
          isCategoryRunning: false,
          timers: [newTimer],
        },
      ];
      setTimerList(updatedList);
      setFilteredTimers(updatedList);
      await asyncStorage.setTimerList(updatedList);
      ToastMessage.showSuccess('Added successfully !');
      onClose();
      return;
    }

    const updatedCategoryTimerList = timerList.map((item: any) => {
      if (item.categoryName === newTimer.category) {
        return {
          ...item,
          timers: [...item.timers, newTimer],
        };
      }
      return item;
    });

    setTimerList(updatedCategoryTimerList);
    setFilteredTimers(updatedCategoryTimerList);
    await asyncStorage.setTimerList(updatedCategoryTimerList);
    ToastMessage.showSuccess('Added successfully !');
    onClose();
  };
  return (
    <CustomModal headerText={headerText} modalVisible={true} onClose={onClose}>
      <CustomInput
        label="Timer Name"
        placeholder="Enter Timer Name"
        value={timer.timerName}
        onInputChange={text => setTimer({...timer, timerName: text})}
      />
      <CustomInput
        label="Duration (seconds)"
        placeholder="Enter Duration"
        keyboardType="numeric"
        value={timer.duration.toString()}
        onInputChange={text => setTimer({...timer, duration: text})}
      />
      <CustomInput
        label="Category"
        placeholder="Enter Category"
        value={timer.category}
        onInputChange={text => setTimer({...timer, category: text})}
      />
      <CustomRadioButton
        label="halfway Alert"
        onPress={() => setTimer({...timer, alertHalfway: !timer.alertHalfway})}
        selected={timer.alertHalfway}
      />
      <CustomButton
        buttonStyle={{marginTop: 20}}
        onPress={onAddTimer}
        title="Add Timer"
      />
    </CustomModal>
  );
}
