import {SafeAreaView, View} from 'react-native';
import React, {ReactElement} from 'react';
import Header from '../Header/Header';

interface Props {
  children: ReactElement;
  isHeaderVisible?: boolean;
}

const LayoutWrapper = ({isHeaderVisible = true, children}: Props) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View style={{marginBottom: 10}}>{isHeaderVisible && <Header />}</View>
        <View>{children}</View>
      </View>
    </SafeAreaView>
  );
};

export default LayoutWrapper;
