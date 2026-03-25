import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { router } from "expo-router";
import { theme, commonStyles } from "@/shared/styles";

interface AuthFooterProps {
  question: string;
  linkText: string;
  linkRoute: string;
}

export function AuthFooter({ question, linkText, linkRoute }: AuthFooterProps) {
  return (
    <Animated.View entering={FadeIn.duration(500).delay(200)} style={styles.container}>
      <Text style={commonStyles.textBodySecondary}>
        {question}
      </Text>
      <TouchableOpacity onPress={() => router.push(linkRoute as any)}>
        <Text style={[commonStyles.textBody, styles.link]}>{linkText}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.sectionGap,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  link: {
    color: theme.colors.info,
    fontWeight: '600',
  },
});
