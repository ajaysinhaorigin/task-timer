import {Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SCREEN} from '../../../navigations/Screens';
import FlexBox from '../../FlexBox/FlexBox';

export default function Header() {
  const navigate = useNavigation<any>();
  const navigateTo = (navigateTo: string) => () =>
    navigate.navigate(navigateTo);

  return (
    <FlexBox direction="row" spacing={10}>
      <Button title="Home" onPress={navigateTo(SCREEN.HOME)} />
      <Button title="History" onPress={navigateTo(SCREEN.HISTORY)} />
    </FlexBox>
  );
}
