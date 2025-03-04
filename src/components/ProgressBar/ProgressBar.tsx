import React from 'react';
import {View} from 'react-native';
import {styles} from './ProgressBar.styles';

interface Props {
  percentage: number;
  progressBarStyles?: {};
}

const ProgressBar = ({percentage, progressBarStyles}: Props) => {
  return (
    <View style={styles.container}>
      <View style={{...styles.progressBar, ...progressBarStyles}}>
        <View style={[styles.progress, {width: `${percentage}%`}]} />
      </View>
    </View>
  );
};

export default ProgressBar;
