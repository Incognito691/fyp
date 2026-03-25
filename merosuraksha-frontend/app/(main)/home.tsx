import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button } from "../../shared/components";
import { useAuth } from "../../features/auth/hooks/use-auth";
import { theme, commonStyles } from "@/shared/styles";

export default function HomeScreen() {
  const { user, logout } = useAuth();

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

        <Button text="Logout" onPress={logout} variant="secondary" />
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
});
