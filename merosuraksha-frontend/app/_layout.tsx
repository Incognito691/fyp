import { Stack } from "expo-router/stack";
import { AuthProvider } from "../features/auth/context/auth-context";
import "./global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
