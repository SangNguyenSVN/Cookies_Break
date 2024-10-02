import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import MainActivity from './src/MainActivity';

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

const UserLogin = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <MainActivity/>
    </ClerkProvider>
  );
};

export default UserLogin;
