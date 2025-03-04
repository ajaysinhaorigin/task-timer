import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlexBox, LayoutWrapper} from '../../components';
import {asyncStorage} from '../../services';
import {Timer, TimerCategory} from '../../Interfaces';

const HistoryScreen = () => {
  const [completedTasks, setCompletedTasks] = useState<Timer[]>([]);

  useEffect(() => {
    const getCompletedTasks = async () => {
      const storedTimers =
        (await asyncStorage.getTimerList()) as TimerCategory[];
      let completedTasks: Timer[] = [];
      storedTimers.forEach(category => {
        category.timers.forEach(timer => {
          if (timer.isCompleted) {
            completedTasks.push(timer);
          }
        });
      });
      console.log('completed tasks', completedTasks);
      setCompletedTasks(completedTasks);
    };
    getCompletedTasks();
  }, []);

  return (
    <LayoutWrapper>
      <View style={{marginHorizontal: 10, marginVertical: 10}}>
        <Text style={styles.historyHeading}>Completed Tasks</Text>
        {Boolean(completedTasks.length) || (
          <View style={styles.historyCard}>
            <Text>No tasks completed yet</Text>
          </View>
        )}
        {completedTasks.map((task, index) => (
          <View key={index} style={styles.historyCard}>
            <FlexBox
              marginHorizontal={10}
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start">
              <View>
                <Text style={[styles.historyHeading, {fontSize: 16}]}>
                  {task.timerName}
                </Text>
                <Text>category: {task.category}</Text>
              </View>
              <View>
                <Text>duration: {task.duration} seconds</Text>
                <Text>Time: {task.completedAt} </Text>
              </View>
            </FlexBox>
          </View>
        ))}
      </View>
    </LayoutWrapper>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  historyHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  historyCard: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
