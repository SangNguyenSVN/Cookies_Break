import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Pressable, StyleSheet, Image, Alert, ActivityIndicator, Text } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router"; // Import useRouter

WebBrowser.maybeCompleteAuthSession();

const SignInWithGoogle = () => {
  const googleAuth = useOAuth({ strategy: "oauth_google" });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter(); // Khởi tạo router

  const onGoogleSignIn = React.useCallback(async () => {
    setLoading(true);
    try {
      const oAuthFlow = await googleAuth.startOAuthFlow();

      if (oAuthFlow.authSessionResult?.type === 'success') {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({
            session: oAuthFlow.createdSessionId
          });

          // Điều hướng đến màn hình (user) sau khi đăng nhập thành công
          router.replace('/(user)');
        } else {
          Alert.alert("Error", "Could not set active session.");
        }
      } else {
        Alert.alert("Sign In", "Additional sign-in steps may be required.");
      }
    } catch (err) {
      console.error("OAuth error", err);
      Alert.alert("Error", "An error occurred during sign-in.");
    } finally {
      setLoading(false);
    }
  }, [googleAuth, router]); // Thêm router vào dependency array

  return (
    <Pressable onPress={onGoogleSignIn} style={styles.button} disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <>
          <Image style={styles.img_icon} source={require("../assets/icon/google_icon.png")} />
          <Text style={styles.buttonText}>Google</Text>
        </>
      )}
    </Pressable>
  );
}

export default SignInWithGoogle;

const styles = StyleSheet.create({
  button: {
    flexDirection:'row',
    height: 40,
    width: 250,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: 'center',
  },
  img_icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10, // Khoảng cách giữa biểu tượng và chữ
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});
