import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface CustomInputProps extends React.ComponentProps<typeof TextInput> {
  label: string;
  containerStyles?: string;
  inputStyles?: string;
}

const CustomInput = ({
  label,
  containerStyles,
  inputStyles,
  ...props
}: CustomInputProps) => {
  return (
    <View className={`${containerStyles}`}>
      <Text className="text-lg font-medium text-slate-800 pb-1">{label}</Text>
      <TextInput
        className={`border py-2 px-2 text-base rounded-md border-slate-800 focus:border-neutral-800 ${inputStyles}`}
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
};

export default CustomInput;
