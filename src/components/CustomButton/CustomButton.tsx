import {DimensionValue, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './CustomButton.styles';

type ButtonProps = {
  onPress: () => void;
  bgColor?: string;
  textColor?: string;
  width?: DimensionValue;
  title?: string;
  borderRadius?: number;
  height?: number | string;
  fontSize?: number;
  marginTop?: number;
  marginBottom?: number;
  textDecoration?: string;
  fontWeight?: string;
  isDisabled?: boolean;
  buttonStyle?: {};
  paddingHorizontal?: number;
};

const CustomButton: React.FC<ButtonProps> = props => {
  const {title, onPress, buttonStyle} = props;
  return (
    <TouchableOpacity
      style={{
        ...styles(props).mainContainer,
        ...buttonStyle,
      }}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={styles(props).textBox}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
