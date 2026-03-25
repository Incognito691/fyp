import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { AlertCircle, CheckCircle } from "lucide-react-native";
import { theme, commonStyles } from "@/shared/styles";

interface AlertProps {
  type: "error" | "success";
  message: string;
}

export function Alert({ type, message }: AlertProps) {
  return (
    <Animated.View entering={FadeInDown.duration(300)}>
      <View style={[
        styles.container,
        type === "error" ? styles.errorContainer : styles.successContainer
      ]}>
        <View style={styles.content}>
          {type === "error" ? (
            <AlertCircle size={20} color={theme.colors.danger} />
          ) : (
            <CheckCircle size={20} color={theme.colors.safe} />
          )}
          <Text style={[
            styles.text,
            type === "error" ? styles.errorText : styles.successText
          ]}>
            {message}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
  },
  errorContainer: {
    backgroundColor: theme.colors.dangerDim,
    borderColor: theme.colors.dangerBorder,
  },
  successContainer: {
    backgroundColor: theme.colors.safeDim,
    borderColor: theme.colors.safeBorder,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  text: {
    flex: 1,
    ...theme.typography.body,
  },
  errorText: {
    color: theme.colors.dangerText,
  },
  successText: {
    color: theme.colors.safeText,
  },
});
