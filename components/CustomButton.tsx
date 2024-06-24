import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  variant?: 'primary' | 'outline';
  containerStyles?: string;
  titleStyles?: string;
  isLoading?: boolean;
}
const CustomButton = ({
  title,
  handlePress,
  variant = 'primary',
  containerStyles,
  titleStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={handlePress}
      className={`${
        variant === 'primary'
          ? 'bg-slate-800'
          : 'bg-white border border-neutral-800'
      } w-full px-2 rounded-md flex flex-row justify-center items-center py-2 ${containerStyles}`}
    >
      <Text
        className={`${
          variant === 'primary' ? 'text-white' : 'text-slate-800'
        } text-lg font-semibold ${titleStyles}`}
      >
        {isLoading ? (
          <ActivityIndicator
            size={'small'}
            animating={isLoading}
            color={'#1e293b'}
          />
        ) : (
          <>{title}</>
        )}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
