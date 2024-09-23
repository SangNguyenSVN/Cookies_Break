import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Pressable, StyleSheet, Image, Alert, ActivityIndicator } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

const SignInWithGoogle = () => {
  const googleAuth = useOAuth({ strategy: "oauth_google" });
  const [loading, setLoading] = React.useState(false);

  const onGoogleSignIn = React.useCallback(async () => {
    setLoading(true);
    try {
      const oAuthFlow = await googleAuth.startOAuthFlow();

      if (oAuthFlow.authSessionResult?.type === 'success') {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({
            session: oAuthFlow.createdSessionId
          });
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
  }, [googleAuth]);

  return (
    <Pressable onPress={onGoogleSignIn} style={styles.pressLog} disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Image style={styles.img_icon} source={require("../assets/icon/google_icon.png")} />
      )}
    </Pressable>
  );
}

export default SignInWithGoogle;

const styles = StyleSheet.create({
  pressLog: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  img_icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
