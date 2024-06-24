import CustomButton from '@/components/CustomButton';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, Text } from 'react-native';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="font-semibold text-xl">
          The screen you navigated to is not available!
        </Text>
        <CustomButton
          handlePress={() => router.push('/')}
          title="Checkout posts"
          containerStyles="mt-6"
        />
      </SafeAreaView>
    </>
  );
}
