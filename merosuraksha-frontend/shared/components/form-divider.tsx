import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export function FormDivider() {
  return (
    <Animated.View entering={FadeInUp.duration(500).delay(100)}>
      <View className="flex-row items-center gap-lg">
        <View className="flex-1 h-px bg-border-subtle" />
        <Text className="text-small text-text-tertiary">OR</Text>
        <View className="flex-1 h-px bg-border-subtle" />
      </View>
    </Animated.View>
  );
}
