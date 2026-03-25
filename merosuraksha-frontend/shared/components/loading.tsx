import React from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { theme, commonStyles } from "@/shared/styles";

interface LoadingProps {
  message?: string;
}

export function Loading({ message }: LoadingProps) {
  return (
    <Animated.View entering={FadeIn.duration(300)}>
      <View style={[commonStyles.glassCard, styles.container]}>
        <ActivityIndicator size="small" color={theme.colors.infoText} />
        {message && (
          <Text style={[commonStyles.textBodySecondary, styles.message]}>
            {message}
          </Text>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginLeft: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
});
