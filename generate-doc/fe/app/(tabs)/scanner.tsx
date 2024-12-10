import { useState, useEffect } from "react";
import { Dimensions, Alert, Vibration } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { router } from "expo-router";
import { decrypt } from "@/utils/Utils";
import * as Linking from "expo-linking";

const QRScanner: React.FC = () => {
  const [hasCameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [hasAudioPermission, setAudioPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const audioPermission = await Camera.requestMicrophonePermissionsAsync();

      setCameraPermission(cameraPermission.status === "granted");
      setAudioPermission(audioPermission.status === "granted");
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    if (hasCameraPermission !== null && hasAudioPermission !== null) {
      if (!hasCameraPermission || !hasAudioPermission) {
        Alert.alert(
          "Camera Permissions Required",
          "You must grant access to your camera to scan QR codes",
          [
            { text: "Go to settings", onPress: goToSettings },
            { text: "Cancel", onPress: () => router.dismissAll(), style: "cancel" },
          ]
        );
      }
    }
  }, [hasCameraPermission, hasAudioPermission]);

  const handleBarCodeScanned = async ({ data }: { data: any }) => {
    if (scanned) return;
    
    console.log('Data sebelum di enkripsi:', data?.length, 'karakter')
    Vibration.vibrate();
    const decryptedData = decrypt(data) ?? "";

    if (!decryptedData) {
      Alert.alert("Error", "Format QR code tidak valid");
      return;
    }

    console.log('Data setelah di dekripsi:', decryptedData.length, 'karakter');

    setScanned(true);

    router.push({
      pathname: "/[details]",
      params: {  details: decryptedData },
    });
  };

  const goToSettings = () => {
    Linking.openSettings();
  };

  if (hasCameraPermission && hasAudioPermission) {
    return (
      <CameraView
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={{ height: Dimensions.get("window").height }}
      />
    );
  }

  return null;
};

export default QRScanner;
