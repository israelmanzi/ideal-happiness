import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Rubik: require('../assets/fonts/Rubik-Regular.ttf'),
    RubikBold: require('../assets/fonts/Rubik-Bold.ttf'),
    RubikMedium: require('../assets/fonts/Rubik-Medium.ttf'),
    RubikSemibold: require('../assets/fonts/Rubik-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ToastProvider duration={1500}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="create-post" options={{ headerShown: false }} />
            <Stack.Screen
              name="post/[postId]"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </GestureHandlerRootView>
      </ThemeProvider>
    </ToastProvider>
  );
}
