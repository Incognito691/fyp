import React from "react";
import { View, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import { MotiView } from "moti";

import { useAuth } from "../../features/auth/hooks/use-auth";
import { Button, Alert } from "../../shared/components";

export default function OnboardingScreen() {
  const { completeOnboarding, user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleLanguageSelect = async (language: "en" | "ne") => {
    setError(null);
    setLoading(true);

    const result = await completeOnboarding({ language });

    setLoading(false);

    if (result.success) {
      router.replace("/(main)/home");
    } else {
      setError(result.message || "Failed to save preference");
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
          className="mb-8"
        >
          <Text className="text-3xl font-bold text-text">
            Welcome, {user?.name}! 👋
          </Text>
          <Text className="text-textSecondary mt-2">
            Choose your preferred language
          </Text>
        </MotiView>

        {/* Error Alert */}
        {error && <Alert message={error} type="error" />}

        {/* Language Options */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 100 }}
          className="gap-4"
        >
          <Button
            title="English"
            onPress={() => handleLanguageSelect("en")}
            loading={loading}
            disabled={loading}
            size="lg"
          />

          <Button
            title="नेपाली"
            onPress={() => handleLanguageSelect("ne")}
            loading={loading}
            disabled={loading}
            size="lg"
            variant="outline"
          />
        </MotiView>

        <Text className="text-textSecondary text-center mt-8 text-sm">
          You can change this later in settings
        </Text>
      </View>
    </ScrollView>
  );
}
