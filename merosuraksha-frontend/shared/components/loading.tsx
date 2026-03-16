import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { MotiView } from "moti";

interface LoadingProps {
  message?: string;
}

export function Loading({ message }: LoadingProps) {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-row items-center justify-center py-4"
    >
      <ActivityIndicator size="small" color="#007AFF" />
      {message && <Text className="ml-2 text-textSecondary">{message}</Text>}
    </MotiView>
  );
}
