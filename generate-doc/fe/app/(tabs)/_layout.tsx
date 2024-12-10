import { Stack } from "expo-router";

const Layout: React.FC = () => (
  <Stack>
    <Stack.Screen
      name="index"
      options={{
        headerShown: false,
        title: "Home",
        headerBackVisible: false,
      }}
    />
    <Stack.Screen
      name="scanner"
      options={{
        headerShown: true,
        title: "Scan a QR Code",
        headerBackVisible: true,
      }}
    />
    <Stack.Screen
      name="[details]"
      options={{
        headerShown: false,
        title: "Informasi Pemohon",
      }}
    />
  </Stack>
);

export default Layout;