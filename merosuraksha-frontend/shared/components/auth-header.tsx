import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Shield, Globe, User } from "lucide-react-native";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  icon?: "shield" | "globe" | "user";
}

export function AuthHeader({ title, subtitle, icon = "shield" }: AuthHeaderProps) {
  const getIcon = () => {
    switch (icon) {
      case "shield":
        return <Shield size={48} color="#60A5FA" strokeWidth={2} />;
      case "globe":
        return <Globe size={48} color="#60A5FA" strokeWidth={2} />;
      case "user":
        return <User size={48} color="#60A5FA" strokeWidth={2} />;
      default:
        return <Shield size={48} color="#60A5FA" strokeWidth={2} />;
    }
  };

  return (
    <Animated.View entering={FadeInDown.duration(500)} className="mb-section-gap">
      <View className="glass-card-strong mb-lg p-card-padding rounded-xl items-center">
        {getIcon()}
      </View>
      <Text className="text-display text-text-primary text-center mb-2">
        {title}
      </Text>
      <Text className="text-body-secondary text-center">
        {subtitle}
      </Text>
    </Animated.View>
  );
}
