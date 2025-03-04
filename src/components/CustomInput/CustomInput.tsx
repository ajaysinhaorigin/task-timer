import React from 'react';
import {View, TextInput, Text, StyleSheet, TextInputProps} from 'react-native';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  value: string;
  onInputChange: (text: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onInputChange,
  label,
  error,
  placeholder,
  keyboardType,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onInputChange}
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomInput;
