import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { AlertCircle, CheckCircle } from "lucide-react-native";

interface AlertProps {
  message: string;
  type?: "error" | "success";
}

export function Alert({ message, type = "error" }: AlertProps) {
  return (
    <Animated.View entering={FadeInDown.duration(300)}>
      <View className={`
        p-4 rounded-lg mb-2 border
        ${type === "error"
          ? "bg-red-900/20 border-red-500/30"
          : "bg-green-900/20 border-green-500/30"
        }
      `}>
        <View className="flex-row items-center gap-3">
          {type === "error" ? (
            <AlertCircle size={20} color="#EF4444" />
          ) : (
            <CheckCircle size={20} color="#10B981" />
          )}
          <Text className={`
            flex-1 text-base
            ${type === "error" ? "text-red-400" : "text-green-400"}
          `}>
            {message}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
