import React from "react";
import { View, Text, ScrollView } from "react-native";

import { Button } from "../../shared/components";
import { useAuth } from "../../features/auth/hooks/use-auth";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-2xl font-bold text-text mb-4">
          Welcome, {user?.name}! 🎉
        </Text>
        <Text className="text-textSecondary text-center mb-8">
          You&apos;re now protected with MeroSuraksha
        </Text>

        <Button title="Logout" onPress={logout} variant="outline" size="lg" />
      </View>
    </ScrollView>
  );
}
