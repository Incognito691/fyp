import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../../shared/components";
import { useAuth } from "../../features/auth/hooks/use-auth";
import { theme, commonStyles } from "@/shared/styles";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <ScrollView
      style={commonStyles.screen}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.container}>
        <Text style={[commonStyles.textH1, styles.welcome]}>
          Welcome, {user?.name}! 🎉
        </Text>
        <Text style={[commonStyles.textBodySecondary, styles.subtitle]}>
          You're now protected with MeroSuraksha
        </Text>

        <View style={styles.buttonContainer}>
          <Button 
            text="Verify Phone Number" 
            onPress={() => router.push("/(main)/verify")} 
          />
          <Button text="Logout" onPress={logout} variant="secondary" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing['3xl'],
  },
  buttonContainer: {
    width: '100%',
    gap: theme.spacing.md,
  },
});
