import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

interface LoadingProps {
  message?: string;
}

export function Loading({ message }: LoadingProps) {
  return (
    <Animated.View entering={FadeIn.duration(300)}>
      <View className="glass-card p-card-padding rounded-lg items-center justify-center">
        <ActivityIndicator size="small" color="#60A5FA" />
        {message && (
          <Text className="text-body text-text-secondary ml-sm mt-sm">
            {message}
          </Text>
        )}
      </View>
    </Animated.View>
  );
}
