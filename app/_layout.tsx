import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { Stack, useRouter  } from 'expo-router';
import { useEffect } from 'react';

const CLERK_PUBLISHABLE_KEY = "pk_test_bW92ZWQtbWVlcmthdC05My5jbGVyay5hY2NvdW50cy5kZXYk";



const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      console.error("Failed to get token:", err);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("Failed to save token:", err);
    }
  },
};

const _layout = () => {
  const router = useRouter(); // Sử dụng useRouter để điều hướng

  useEffect(() => {
    // Điều hướng đến màn hình (public) khi ứng dụng khởi động
    router.replace('/(public)'); 
  }, []);
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <Stack initialRouteName='(public)'>
        <Stack.Screen name="(public)" options={{ headerShown: false }} />
        <Stack.Screen name="(doctor)" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ClerkProvider>
  );
};

export default _layout;
