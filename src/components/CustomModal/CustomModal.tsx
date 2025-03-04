import React, {ReactNode} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  DimensionValue,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  Text,
} from 'react-native';
import {styles} from './CustomModal.styles';
import FlexBox from '../FlexBox/FlexBox';
import {Cross} from '../../assets/Images';

interface CustomModalProps {
  onClose: () => void;
  modalVisible: boolean;
  children: ReactNode;
  isHeaderVisible?: boolean;
  isFooterVisible?: boolean;
  headerText?: string;
  modalHeight?: DimensionValue;
}

const CustomModal: React.FC<CustomModalProps> = ({
  onClose,
  modalVisible,
  children,
  isHeaderVisible = true,
  headerText,
  modalHeight,
}) => {
  const modalBackgroundColor = modalVisible
    ? 'rgba(0, 0, 0, 0.5)'
    : 'transparent';

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            ...styles.modalOverlay,
            backgroundColor: modalBackgroundColor,
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{justifyContent: 'flex-end', flex: 1}}>
            <View style={{...styles.modalView, height: modalHeight || '80%'}}>
              {isHeaderVisible && (
                <FlexBox
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  marginBottom={20}>
                  <Text
                    style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
                    {headerText}
                  </Text>
                  <TouchableOpacity
                    onPress={onClose}
                    activeOpacity={0.8}
                    style={{
                      backgroundColor: 'lightgrey',
                      borderRadius: 50,
                      padding: 2,
                    }}>
                    <Image source={Cross} style={{width: 30, height: 30}} />
                  </TouchableOpacity>
                </FlexBox>
              )}
              <View style={{flex: 1}}>{children}</View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;
