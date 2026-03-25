import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { theme, commonStyles } from "@/shared/styles";

export function FormDivider() {
  return (
    <Animated.View entering={FadeInUp.duration(500).delay(100)}>
      <View style={styles.container}>
        <View style={styles.line} />
        <Text style={[commonStyles.textSmall, styles.text]}>OR</Text>
        <View style={styles.line} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border.subtle,
  },
  text: {
    color: theme.colors.text.tertiary,
  },
});
