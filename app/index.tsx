import CustomButton from '@/components/CustomButton';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Onboarding = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <SafeAreaView className="bg-white">
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className="h-full items-center justify-center px-6 font-rubik">
          <Text className="text-2xl font-semibold font-rubik">
            Product Management System
          </Text>
          {user ? (
            <View className="w-full mt-6">
              <Text className="text-center text-lg text-slate-800 py-4 ">
                Welcome back,{' '}
                <Text className="font-semibold text-neutral-800">
                  {user?.name}
                </Text>
              </Text>
              <CustomButton
                title="Go to Home"
                handlePress={() => router.push('/home')}
                containerStyles="mb-3"
              />
              <CustomButton
                title="Logout"
                handlePress={logout}
                variant="outline"
                containerStyles="mt-3 border-slate-800"
                titleStyles=" text-slate-800"
              />
            </View>
          ) : (
            <View className="w-full mt-6">
              <CustomButton
                title="Login"
                handlePress={() => router.push('/login')}
              />
              <CustomButton
                title="Create Account"
                handlePress={() => router.push('/signup')}
                variant="outline"
                containerStyles="mt-5"
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Onboarding;
