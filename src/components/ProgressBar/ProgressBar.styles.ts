import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: 'grey',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 50,
  },
});
