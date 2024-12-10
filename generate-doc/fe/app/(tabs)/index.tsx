import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper"; 
import { router } from "expo-router";

const Home: React.FC = () => {
  const startScan = () => {
    router.push("/scanner");
  };

  return (
    <View style={styles.container}>
      {/* Menampilkan gambar lokal */}
      <Image
        source={require("../../assets/images/logo-unismuh.png")} 
        style={styles.logo}
      />
      
      <Text style={styles.title}>QR Code Scanner</Text>
      <Text style={styles.description}>
        Scan a QR code to retrieve information or perform an action. Tap the button below to start.
      </Text>
      
      {/* Replace Pressable with Button from react-native-paper */}
      <Button 
        mode="contained" 
        icon="qrcode-scan"
        buttonColor={'#244384'}
        onPress={startScan} 
        labelStyle={styles.text}
      >
        Scan QR Code
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: {
    width: 100, 
    height: 100, 
    marginBottom: 20, 
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50", 
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#7f8c8d", 
    textAlign: "center",
    marginBottom: 30, 
    paddingHorizontal: 20, 
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default Home;
