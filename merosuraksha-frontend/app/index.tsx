import React from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { MotiView } from "moti";

export default function IndexScreen() {
  React.useEffect(() => {
    // Redirect to permissions screen first
    router.replace("/permissions");
  }, []);

  return (
    <View className="flex-1 bg-background justify-center items-center">
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 500 }}
      >
        <Text className="text-2xl font-bold text-text">MeroSuraksha</Text>
      </MotiView>
    </View>
  );
}
