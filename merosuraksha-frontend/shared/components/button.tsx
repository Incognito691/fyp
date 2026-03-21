import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline";
  size?: "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Animated.View entering={ZoomIn.duration(200)} className={className}>
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        className={`
          ${variant === "primary"
            ? "bg-blue-500 border-blue-500"
            : "bg-gray-800/50 border-gray-600/50"
          }
          ${size === "lg" ? "h-14" : "h-12"}
          rounded-xl px-6 flex-row items-center justify-center border
          ${isDisabled ? "opacity-50" : ""}
        `}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text className={`
            font-semibold text-base
            ${variant === "primary" ? "text-white" : "text-white"}
          `}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
