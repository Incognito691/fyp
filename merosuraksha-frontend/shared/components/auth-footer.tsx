import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { router } from "expo-router";

interface AuthFooterProps {
  linkText: string;
  linkRoute: string;
  question: string;
}

export function AuthFooter({ question, linkText, linkRoute }: AuthFooterProps) {
  return (
    <Animated.View entering={FadeIn.duration(500).delay(200)} className="mt-section-gap items-center gap-sm">
      <Text className="text-body-secondary">
        {question}
      </Text>
      <TouchableOpacity onPress={() => router.push(linkRoute)}>
        <Text className="text-body text-info font-semibold">{linkText}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
