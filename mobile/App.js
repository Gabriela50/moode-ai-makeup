import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, PermissionsAndroid, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";

export default function App() {
  useEffect(() => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cámara de MOODÉ",
          message: "Permite usar la cámara para probar maquillaje virtual.",
          buttonPositive: "Permitir",
          buttonNegative: "Cancelar"
        }
      ).catch(console.warn);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <WebView
        source={{ uri: "https://moode-ai-makeup-pw71.vercel.app/" }}
        style={styles.webview}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff8fc" },
  webview: { flex: 1, backgroundColor: "#fff8fc" }
});
