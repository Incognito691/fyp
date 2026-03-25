import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { buttonStyles, theme } from "@/shared/styles";

interface ButtonProps {
  text: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export function Button({
  text,
  onPress,
  variant = "primary",
  isLoading = false,
  isDisabled = false,
}: ButtonProps) {
  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return buttonStyles.btnSecondary;
      case "ghost":
        return buttonStyles.btnGhost;
      default:
        return buttonStyles.btnPrimary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "secondary":
        return buttonStyles.btnSecondaryText;
      case "ghost":
        return buttonStyles.btnGhostText;
      default:
        return buttonStyles.btnPrimaryText;
    }
  };

  return (
    <Animated.View entering={ZoomIn.duration(200)}>
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled || isLoading}
        style={[
          getButtonStyle(),
          (isDisabled || isLoading) && styles.disabled
        ]}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={getTextStyle()}>{text}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});
