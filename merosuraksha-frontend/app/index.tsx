import React, { useEffect, useRef } from "react";
import { View, Text, Image } from "react-native";
import { router, useRootNavigationState } from "expo-router";
import Animated, {
  FadeIn,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { Shield } from "lucide-react-native";

export default function SplashScreen() {
  const rootNavigationState = useRootNavigationState();
  const ringOpacity = useSharedValue(0.3);

  // Pulse animation for the ring behind logo
  useEffect(() => {
    ringOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      false
    );
  }, []);

  // Navigate after animation
  useEffect(() => {
    if (!rootNavigationState?.key) return;
    const timer = setTimeout(() => {
      router.replace("/permissions");
    }, 2800);
    return () => clearTimeout(timer);
  }, [rootNavigationState?.key]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: ringOpacity.value,
  }));

  return (
    <View className="flex-1 bg-background justify-center items-center px-5">

      {/* Outer pulse ring */}
      <Animated.View
        style={ringStyle}
        className="absolute w-48 h-48 rounded-full border 
          border-info-border"
      />

      {/* Middle pulse ring */}
      <Animated.View
        style={[ringStyle, { transform: [{ scale: 0.75 }] }]}
        className="absolute w-48 h-48 rounded-full border 
          border-info-border"
      />

      {/* Logo container */}
      <Animated.View
        entering={FadeIn.duration(800)}
        className="items-center"
      >

        {/* ── LOGO ────────────────────────────────────────
            When your logo PNG is ready, replace the View
            + Shield below with just:
            <Image
              source={require('../assets/images/icon.png')}
              className="w-24 h-24"
              resizeMode="contain"
            />
        ────────────────────────────────────────────────── */}
        <View
          className="w-24 h-24 rounded-3xl bg-info-dim 
            border border-info-border items-center 
            justify-center mb-6"
        >
          <Shield size={48} color="#3B82F6" />
        </View>

        {/* App Name */}
        <Animated.View entering={FadeInDown.duration(600).delay(400)}>
          <Text
            className="text-display text-text-primary 
              font-bold text-center tracking-tight"
          >
            MeroSuraksha
          </Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View entering={FadeInDown.duration(600).delay(600)}>
          <Text
            className="text-body text-text-secondary 
              text-center mt-2"
          >
            Your Digital Security Companion
          </Text>
        </Animated.View>

        {/* Animated dots loader */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(900)}
          className="flex-row gap-2 mt-10"
        >
          {[0, 1, 2].map((i) => (
            <AnimatedDot key={i} delay={i * 200} />
          ))}
        </Animated.View>

      </Animated.View>

      {/* Bottom tagline */}
      <Animated.View
        entering={FadeInDown.duration(600).delay(1000)}
        className="absolute bottom-12"
      >
        <Text className="text-small text-text-tertiary text-center">
          Protecting Nepal, one scan at a time
        </Text>
      </Animated.View>

    </View>
  );
}

// Animated dot component
function AnimatedDot({ delay }: { delay: number }) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0.3, { duration: 500 })
      ),
      -1,
      false
    );
  }, []);

  // Stagger the start
  useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0.3, { duration: 500 })
        ),
        -1,
        false
      );
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={dotStyle}
      className="w-2 h-2 rounded-full bg-info"
    />
  );
}