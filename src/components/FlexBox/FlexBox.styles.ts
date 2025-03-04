import {StyleSheet} from 'react-native';

export const styles = (props?: any) =>
  StyleSheet.create({
    containerStyle: {
      flexDirection: props.direction,
      justifyContent: props.justifyContent,
      alignItems: props.alignItems || 'center',
      gap: props.spacing,
      flexWrap: props.flexWrap,
      marginVertical: props.marginVertical,
      marginHorizontal: props.marginHorizontal,
      marginBottom: props.marginBottom,
      marginTop: props.marginTop,
      flex: props.flex,
    },
  });
