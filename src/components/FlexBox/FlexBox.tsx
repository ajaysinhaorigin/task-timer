import {View} from 'react-native';
import React, {ReactNode} from 'react';
import {styles} from './FlexBox.styles';

interface FlexBoxProps {
  children: ReactNode;
  direction?: any;
  spacing?: number;
  justifyContent?:
    | 'center'
    | 'space-between'
    | 'space-evenly'
    | 'space-around'
    | 'flex-end';
  alignItems?: 'center' | 'flex-end' | 'flex-start';
  flexWrap?: string;
  marginVertical?: number;
  marginHorizontal?: number;
  marginBottom?: number;
  marginTop?: number;
  flex?: number;
}

const FlexBox: React.FC<FlexBoxProps> = props => {
  const {children} = props;

  return <View style={styles(props).containerStyle}>{children}</View>;
};

export default FlexBox;
