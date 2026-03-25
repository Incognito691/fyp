import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Globe, Shield, CheckCircle } from "lucide-react-native";

import { useAuth } from "../../features/auth/hooks/use-auth";
import { Alert, Loading } from "../../shared/components";
import { theme, commonStyles } from "@/shared/styles";

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
    <View style={commonStyles.screen}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          {/* Header */}
          <Animated.View
            entering={FadeInDown.duration(500)}
            style={styles.header}
          >
            <View style={styles.iconContainer}>
              <Globe size={56} color={theme.colors.info.DEFAULT} strokeWidth={2} />
            </View>
            <Text style={styles.title}>
              Welcome, {user?.name}! 👋
            </Text>
            <Text style={styles.subtitle}>
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
            style={styles.languageContainer}
          >
            {/* English Option */}
            <TouchableOpacity
              style={[
                styles.languageCard,
                selectedLanguage === "en" && styles.languageCardSelected
              ]}
              onPress={() => handleLanguageSelect("en")}
              disabled={loading}
              activeOpacity={0.7}
            >
              <View style={styles.languageContent}>
                <View style={styles.languageLeft}>
                  <View style={[
                    styles.radioButton,
                    selectedLanguage === "en" && styles.radioButtonSelected
                  ]}>
                    {selectedLanguage === "en" && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <View style={styles.languageText}>
                    <Text style={styles.languageName}>English</Text>
                    <Text style={styles.languageDescription}>
                      Continue in English language
                    </Text>
                  </View>
                </View>
                <Text style={styles.languageFlag}>🇬🇧</Text>
              </View>
            </TouchableOpacity>

            {/* Nepali Option */}
            <TouchableOpacity
              style={[
                styles.languageCard,
                selectedLanguage === "ne" && styles.languageCardSelected
              ]}
              onPress={() => handleLanguageSelect("ne")}
              disabled={loading}
              activeOpacity={0.7}
            >
              <View style={styles.languageContent}>
                <View style={styles.languageLeft}>
                  <View style={[
                    styles.radioButton,
                    selectedLanguage === "ne" && styles.radioButtonSelected
                  ]}>
                    {selectedLanguage === "ne" && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <View style={styles.languageText}>
                    <Text style={styles.languageName}>नेपाली</Text>
                    <Text style={styles.languageDescription}>
                      नेपाली भाषामा जारी राख्नुहोस्
                    </Text>
                  </View>
                </View>
                <Text style={styles.languageFlag}>🇳🇵</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Security Note */}
          <Animated.View
            entering={FadeInUp.duration(500).delay(200)}
            style={styles.securityContainer}
          >
            <View style={styles.securityCard}>
              <View style={styles.securityContent}>
                <Shield size={22} color={theme.colors.safe.DEFAULT} strokeWidth={2} />
                <View style={styles.securityText}>
                  <Text style={styles.securityTitle}>
                    Privacy & Security
                  </Text>
                  <Text style={styles.securityDescription}>
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


const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: theme.spacing['3xl'],
    minHeight: '100%',
  },
  header: {
    marginBottom: theme.spacing['3xl'],
    alignItems: 'center',
  },
  iconContainer: {
    ...commonStyles.glassCard,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.2)',
  },
  title: {
    ...theme.typography.display,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    fontWeight: '700',
  },
  subtitle: {
    ...theme.typography.body,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  languageContainer: {
    gap: theme.spacing.lg,
    marginTop: theme.spacing.xl,
  },
  languageCard: {
    ...commonStyles.glassCard,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.border.default,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  languageCardSelected: {
    borderColor: theme.colors.info.DEFAULT,
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
    flex: 1,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.border.default,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  radioButtonSelected: {
    borderColor: theme.colors.info.DEFAULT,
    backgroundColor: theme.colors.info.DEFAULT,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  languageText: {
    flex: 1,
  },
  languageName: {
    ...theme.typography.h3,
    color: '#FFFFFF',
    marginBottom: theme.spacing.xs,
    fontWeight: '600',
  },
  languageDescription: {
    ...theme.typography.small,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  languageFlag: {
    fontSize: 40,
    marginLeft: theme.spacing.md,
  },
  securityContainer: {
    marginTop: theme.spacing['3xl'],
  },
  securityCard: {
    ...commonStyles.glassCard,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: 'rgba(74, 222, 128, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.2)',
  },
  securityContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  securityText: {
    flex: 1,
  },
  securityTitle: {
    ...theme.typography.small,
    color: theme.colors.safe.DEFAULT,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  securityDescription: {
    ...theme.typography.small,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 20,
  },
});
