import { Stack } from "expo-router";
import { AuthProvider } from "../features/auth/context/auth-context";
import "./global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Explicitly tell Expo Router about your top-level structure */}
        <Stack.Screen name="index" />
        <Stack.Screen name="permissions" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
    </AuthProvider>
  );
}