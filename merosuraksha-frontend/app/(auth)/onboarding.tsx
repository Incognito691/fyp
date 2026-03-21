import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Globe, Shield, CheckCircle } from "lucide-react-native";

import { useAuth } from "../../features/auth/hooks/use-auth";
import { Button, Alert, Loading } from "../../shared/components";

export default function OnboardingScreen() {
  const { completeOnboarding, user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = React.useState<"en" | "ne" | null>(null);

  const handleLanguageSelect = async (language: "en" | "ne") => {
    setError(null);
    setSelectedLanguage(language);
    setLoading(true);

    const result = await completeOnboarding({ language });

    setLoading(false);

    if (result.success) {
      router.replace("/(main)/home");
    } else {
      setError(result.message || "Failed to save preference");
      setSelectedLanguage(null);
    }
  };

  return (
    <View className="screen">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-center min-h-screen py-section-gap">
          {/* Header */}
          <Animated.View
            entering={FadeInDown.duration(500)}
            className="mb-section-gap"
          >
            <View className="glass-card-strong mb-lg p-card-padding rounded-xl items-center">
              <Globe size={48} color="#60A5FA" strokeWidth={2} />
            </View>
            <Text className="text-display text-text-primary text-center mb-2">
              Welcome, {user?.name}! 👋
            </Text>
            <Text className="text-body-secondary text-center">
              Choose your preferred language to continue
            </Text>
          </Animated.View>

          {/* Error Alert */}
          {error && (
            <Animated.View entering={FadeInDown.duration(300)}>
              <Alert message={error} type="error" />
            </Animated.View>
          )}

          {/* Language Options */}
          <Animated.View
            entering={FadeInUp.duration(500).delay(100)}
            className="gap-lg"
          >
            {/* English Option */}
            <TouchableOpacity
              className={`glass-card p-card-padding rounded-lg border ${selectedLanguage === "en"
                  ? "border-info bg-info-dim"
                  : "border-border-default"
                }`}
              onPress={() => handleLanguageSelect("en")}
              disabled={loading}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-lg">
                  <View className={`w-5 h-5 rounded-full border-2 ${selectedLanguage === "en"
                      ? "border-info bg-info"
                      : "border-border-default"
                    } items-center justify-center`}>
                    {selectedLanguage === "en" && (
                      <CheckCircle size={12} color="#FFFFFF" />
                    )}
                  </View>
                  <View>
                    <Text className="text-h3 text-text-primary mb-1">English</Text>
                    <Text className="text-small text-text-secondary">
                      Continue in English language
                    </Text>
                  </View>
                </View>
                <Text className="text-display text-info">🇬🇧</Text>
              </View>
            </TouchableOpacity>

            {/* Nepali Option */}
            <TouchableOpacity
              className={`glass-card p-card-padding rounded-lg border ${selectedLanguage === "ne"
                  ? "border-info bg-info-dim"
                  : "border-border-default"
                }`}
              onPress={() => handleLanguageSelect("ne")}
              disabled={loading}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-lg">
                  <View className={`w-5 h-5 rounded-full border-2 ${selectedLanguage === "ne"
                      ? "border-info bg-info"
                      : "border-border-default"
                    } items-center justify-center`}>
                    {selectedLanguage === "ne" && (
                      <CheckCircle size={12} color="#FFFFFF" />
                    )}
                  </View>
                  <View>
                    <Text className="text-h3 text-text-primary mb-1">नेपाली</Text>
                    <Text className="text-small text-text-secondary">
                      नेपाली भाषामा जारी राख्नुहोस्
                    </Text>
                  </View>
                </View>
                <Text className="text-display text-warning">🇳🇵</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Security Note */}
          <Animated.View
            entering={FadeInUp.duration(500).delay(200)}
            className="mt-section-gap"
          >
            <View className="glass-card-safe p-card-padding rounded-lg">
              <View className="flex-row items-start gap-lg">
                <Shield size={20} color="#4ADE80" />
                <View className="flex-1">
                  <Text className="text-small text-safe-text font-semibold mb-1">
                    Privacy & Security
                  </Text>
                  <Text className="text-small text-text-secondary leading-5">
                    Your language preference is stored securely and can be changed anytime in settings.
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Loading State */}
          {loading && <Loading message="Setting up your experience..." />}
        </View>
      </ScrollView>
    </View>
  );
}
