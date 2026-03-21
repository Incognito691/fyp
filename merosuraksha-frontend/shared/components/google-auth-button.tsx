import React from "react";
import { TouchableOpacity, ActivityIndicator, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Chrome } from "lucide-react-native";

interface GoogleAuthButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
}

export function GoogleAuthButton({ 
  onPress, 
  loading = false, 
  disabled = false,
  text = "Continue with Google"
}: GoogleAuthButtonProps) {
  return (
    <Animated.View entering={FadeInUp.duration(500)}>
      <TouchableOpacity
        className="glass-card border-border-default h-btn rounded-md px-6 flex-row items-center justify-center gap-sm"
        onPress={onPress}
        disabled={disabled || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#60A5FA" />
        ) : (
          <Chrome size={20} color="#60A5FA" />
        )}
        <Text className="text-body text-text-primary font-semibold">
          {text}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
