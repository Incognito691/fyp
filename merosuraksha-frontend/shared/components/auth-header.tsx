import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Shield, Globe, User } from "lucide-react-native";
import { theme, commonStyles } from "@/shared/styles";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  icon?: "shield" | "globe" | "user";
}

export function AuthHeader({ title, subtitle, icon = "shield" }: AuthHeaderProps) {
  const getIcon = () => {
    const iconColor = theme.colors.infoText;
    const iconSize = 48;
    
    switch (icon) {
      case "globe":
        return <Globe size={iconSize} color={iconColor} strokeWidth={2} />;
      case "user":
        return <User size={iconSize} color={iconColor} strokeWidth={2} />;
      default:
        return <Shield size={iconSize} color={iconColor} strokeWidth={2} />;
    }
  };

  return (
    <Animated.View entering={FadeInDown.duration(500)} style={styles.container}>
      <View style={[commonStyles.glassCardStrong, styles.iconContainer]}>
        {getIcon()}
      </View>
      <Text style={[commonStyles.textDisplay, styles.title]}>
        {title}
      </Text>
      <Text style={[commonStyles.textBodySecondary, styles.subtitle]}>
        {subtitle}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.sectionGap,
  },
  iconContainer: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.cardPadding,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
  },
});
