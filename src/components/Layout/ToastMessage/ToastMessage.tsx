import {showMessage} from 'react-native-flash-message';

export class ToastMessage {
  static showError = (message: string) => {
    showMessage({
      message,
      type: 'danger',
      icon: 'danger',
      duration: 1900,
    });
  };
  static showSuccess = (message: string) => {
    showMessage({
      message,
      type: 'success',
      icon: 'success',
      duration: 3000,
    });
  };
}
