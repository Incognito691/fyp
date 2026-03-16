import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { MotiView } from "moti";

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
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 200 }}
      className={`items-center justify-center rounded-lg ${
        variant === "primary"
          ? "bg-primary"
          : "bg-transparent border-2 border-primary"
      } ${size === "lg" ? "h-14" : "h-12"} ${isDisabled ? "opacity-50" : ""} ${className}`}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        className="flex-row items-center"
      >
        {loading ? (
          <ActivityIndicator
            color={variant === "primary" ? "#fff" : "#007AFF"}
            size="small"
          />
        ) : (
          <Text
            className={`font-semibold ${
              variant === "primary" ? "text-white" : "text-primary"
            } ${size === "lg" ? "text-base" : "text-sm"}`}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </MotiView>
  );
}
