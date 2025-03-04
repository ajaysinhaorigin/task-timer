import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FlexBox from '../FlexBox/FlexBox';
import {
  CollapseIcon,
  ExpandIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
} from '../../assets/Images';
import ProgressBar from '../ProgressBar/ProgressBar';
import {TimerCategory} from '../../Interfaces';
import {asyncStorage} from '../../services';
import {ToastMessage} from '../Layout/ToastMessage/ToastMessage';

interface Props {
  timerList: TimerCategory[];
  setTimerList: React.Dispatch<React.SetStateAction<TimerCategory[]>>;
}

export default function AccordianTimer({timerList, setTimerList}: Props) {
  const [intervals, setIntervals] = useState<{
    [key: string]: NodeJS.Timeout | null;
  }>({});

  useEffect(() => {
    return () => {
      Object.values(intervals).forEach(interval => {
        if (interval) {
          clearInterval(interval);
        }
      });
    };
  }, [intervals]);

  const onExpandAndCollapse = (id: number, isExpanded: boolean) => {
    const updatedTimerList = timerList.map(item =>
      item.id === id ? {...item, isExpanded} : item,
    );
    setTimerList(updatedTimerList);
  };

  const updateCategoryTimerList = (
    prevList: TimerCategory[],
    categoryId: number,
    timerId: number,
  ) => {
    return prevList.map(cat =>
      cat.id === categoryId
        ? {
            ...cat,
            timers: cat.timers.map(timer =>
              timer.id === timerId
                ? {
                    ...timer,
                    remaininTime: 0,
                    isRunning: false,
                    isCompleted: true,
                    completedAt: new Date().toDateString(),
                  }
                : timer,
            ),
          }
        : cat,
    );
  };

  const onPlayPause = (categoryId: number, timerId: number) => {
    return timerList.map(item => {
      if (item.id === categoryId) {
        const updatedTimers = item.timers.map(timer =>
          timer.id === timerId
            ? {...timer, isRunning: !timer.isRunning}
            : timer,
        );
        return {...item, timers: updatedTimers};
      }
      return item;
    });
  };

  const onPlayAndPause = async (
    categoryId: number,
    timerId: number,
    isRunning: boolean,
  ) => {
    // to start and pause timer
    const updatedTimerList = onPlayPause(categoryId, timerId);
    setTimerList(updatedTimerList);
    await asyncStorage.setTimerList(updatedTimerList);

    const key = `${categoryId}-${timerId}`;
    // once the timer starts -- count down the time
    if (!isRunning) {
      const interval = setInterval(() => {
        setTimerList(prevList =>
          prevList.map(category =>
            category.id === categoryId
              ? {
                  ...category,
                  timers: category.timers.map(timer => {
                    if (timer.id === timerId) {
                      if (timer.remaininTime <= 1) {
                        clearInterval(interval);

                        const updatedList = updateCategoryTimerList(
                          prevList,
                          categoryId,
                          timerId,
                        );

                        setTimerList(updatedList);
                        // storing timer once it is completed
                        asyncStorage.setTimerList(updatedList);
                        ToastMessage.showSuccess(
                          `Congratulations the timer ${timer.timerName} is completed !`,
                        );
                        return {
                          ...timer,
                          remaininTime: 0,
                          isRunning: false,
                          isCompleted: true,
                          completedAt: new Date().toDateString(),
                        };
                      }
                      return {
                        ...timer,
                        remaininTime: timer.remaininTime - 1,
                      };
                    }
                    return timer;
                  }),
                }
              : category,
          ),
        );
      }, 1000);

      setIntervals(prev => ({...prev, [key]: interval}));
    } else {
      // Stop Timer
      if (intervals[key]) {
        clearInterval(intervals[key]!);
      }
      setIntervals(prev => ({...prev, [key]: null}));
    }
  };

  const onResetTimer = async (categoryId: number, timerId: number) => {
    const updatedTimerList = timerList.map(item => {
      if (item.id === categoryId) {
        const updatedTimers = item.timers.map(timer =>
          timer.id === timerId
            ? {...timer, remaininTime: timer.duration, isCompleted: false}
            : timer,
        );
        return {...item, timers: updatedTimers};
      }
      return item;
    });

    setTimerList(updatedTimerList);
    await asyncStorage.setTimerList(updatedTimerList);
  };

  const onCategoryPlayAndPause = (categoryId: number) => async () => {
    setTimerList(prevList =>
      prevList.map(category => {
        if (category.id === categoryId) {
          // Check if any timers in this category are running
          const areAnyRunning = category.timers.some(timer => timer.isRunning);

          const updatedTimers = category.timers.map(timer => {
            const key = `${categoryId}-${timer.id}`;

            if (areAnyRunning) {
              // If timers are running, stop all of them
              if (intervals[key]) {
                clearInterval(intervals[key]); // Stop the timer
                setIntervals(prev => {
                  const newIntervals = {...prev};
                  delete newIntervals[key]; // Remove it from intervals state
                  return newIntervals;
                });
              }
              return {...timer, isRunning: false}; // Mark as paused
            } else if (!timer.isRunning && !timer.isCompleted) {
              // If none are running, start only the paused ones
              const interval = setInterval(() => {
                setTimerList(prevList =>
                  prevList.map(cat =>
                    cat.id === categoryId
                      ? {
                          ...cat,
                          timers: cat.timers.map(t => {
                            if (t.id === timer.id) {
                              if (t.remaininTime <= 1) {
                                clearInterval(interval);
                                const updatedList = updateCategoryTimerList(
                                  prevList,
                                  categoryId,
                                  timer.id,
                                );
                                setTimerList(updatedList);
                                asyncStorage.setTimerList(updatedList);
                                return {
                                  ...t,
                                  remaininTime: 0,
                                  isRunning: false,
                                  isCompleted: true,
                                };
                              }
                              return {...t, remaininTime: t.remaininTime - 1};
                            }
                            return t;
                          }),
                        }
                      : cat,
                  ),
                );
              }, 1000);

              setIntervals(prev => ({...prev, [key]: interval}));
              return {...timer, isRunning: true};
            }
            return timer;
          });

          return {
            ...category,
            timers: updatedTimers,
          };
        }
        return category;
      }),
    );
  };

  const onCategoryReset = (categoryId: number) => async () => {
    const updateList = timerList.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          isCategoryRunning: false,
          timers: category.timers.map(timer => ({
            ...timer,
            isRunning: false,
            remaininTime: timer.duration,
            isCompleted: false,
          })),
        };
      }
      return category;
    });

    setTimerList(updateList);
    await asyncStorage.setTimerList(updateList);
  };

  return (
    <View style={{marginTop: 20}}>
      {timerList.map(item => (
        <View key={item.id} style={styles.mainCard}>
          <FlexBox
            direction="row"
            justifyContent="space-between"
            marginHorizontal={8}>
            <Text style={styles.timerCardHeading}>{item.categoryName}</Text>
            <FlexBox direction="row" spacing={10}>
              <TouchableOpacity
                style={{width: 25, height: 25}}
                onPress={onCategoryPlayAndPause(item.id)}>
                <Image
                  source={!item.isCategoryRunning ? PlayIcon : PauseIcon}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: 25, height: 25}}
                onPress={onCategoryReset(item.id)}>
                <Image
                  source={ResetIcon}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
            </FlexBox>
            <View style={{width: 50, height: 50}}>
              {item.isExpanded ? (
                <TouchableOpacity
                  onPress={() => onExpandAndCollapse(item.id, false)}>
                  <Image
                    source={CollapseIcon}
                    style={{width: '100%', height: '100%'}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => onExpandAndCollapse(item.id, true)}>
                  <Image
                    source={ExpandIcon}
                    style={{width: '100%', height: '100%'}}
                  />
                </TouchableOpacity>
              )}
            </View>
          </FlexBox>

          {item.isExpanded &&
            item.timers.map(timer => (
              <View key={timer.id} style={styles.expandedCard}>
                <FlexBox
                  direction="row"
                  justifyContent="space-between"
                  marginHorizontal={8}>
                  <View>
                    <Text style={styles.timerCardHeading}>
                      {timer.timerName}
                    </Text>
                    <Text>
                      Timer:{' '}
                      {timer.isCompleted
                        ? 'Completed'
                        : !timer.isRunning
                        ? 'Start'
                        : 'Running'}
                    </Text>

                    <Text>
                      duration: {timer.duration - timer.remaininTime}/
                      {timer.duration}
                    </Text>
                  </View>
                  <FlexBox direction="row" spacing={10}>
                    <TouchableOpacity
                      style={{width: 25, height: 25}}
                      onPress={() =>
                        onPlayAndPause(item.id, timer.id, timer.isRunning)
                      }>
                      <Image
                        source={!timer.isRunning ? PlayIcon : PauseIcon}
                        style={{width: '100%', height: '100%'}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{width: 25, height: 25}}
                      onPress={() => onResetTimer(item.id, timer.id)}>
                      <Image
                        source={ResetIcon}
                        style={{width: '100%', height: '100%'}}
                      />
                    </TouchableOpacity>
                  </FlexBox>
                </FlexBox>
                <ProgressBar
                  percentage={
                    (100 / timer.duration) *
                    (timer.duration - timer.remaininTime)
                  }
                />
              </View>
            ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  timerCardHeading: {fontSize: 16, fontWeight: '600', color: 'black'},
  expandedCard: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#a1a1a1',
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 12,
  },

  mainCard: {
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
