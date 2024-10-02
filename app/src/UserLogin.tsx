import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const CLERK_PUBLISHABLE_KEY = "pk_test_bW92ZWQtbWVlcmthdC05My5jbGVyay5hY2NvdW50cy5kZXYk";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Thêm trạng thái để xác định người dùng có đăng nhập thủ công hay không
  const [manualLogin, setManualLogin] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(users)';

    console.log('User changed: ', isSignedIn);

    if (isSignedIn && manualLogin) {
      // Nếu người dùng đã đăng nhập và là đăng nhập thủ công, chuyển đến trang doctor
      router.replace('/(doctor)');
    } else if (isSignedIn && !inTabsGroup) {
      // Điều hướng đến /users nếu không phải là đăng nhập thủ công
      router.replace('/(users)');
    } else if (!isSignedIn) {
      // Điều hướng đến trang public nếu chưa đăng nhập
      router.replace('/(publicsu)');
    }
  }, [isLoaded, isSignedIn, segments, router, manualLogin]);

  return <Slot />;
};

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

const UserLogin = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
        <InitialLayout />
    </ClerkProvider>
  );
};

export default UserLogin;
