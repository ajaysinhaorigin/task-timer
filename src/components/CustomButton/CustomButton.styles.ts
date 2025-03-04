import {StyleSheet} from 'react-native';

export const styles = (props: any) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: props.bgColor || 'black',
      borderRadius: props.borderRadius || 10,
      width: props.width || '100%',
      height: props.height || 45,
      marginTop: props.marginTop,
      marginBottom: props.marginBottom,
      paddingHorizontal: props.paddingHorizontal || 10,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 5,
    },
    textBox: {
      fontWeight: props.fontWeight || '700',
      color: props.textColor || 'white',
      fontSize: props.fontSize || 16,
      textDecorationLine: props.textDecoration,
    },
  });
