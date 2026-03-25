import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
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
import { theme, commonStyles } from "@/shared/styles";

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
    <View style={[commonStyles.screenCentered, { paddingHorizontal: theme.spacing.xl }]}>

      {/* Outer pulse ring */}
      <Animated.View
        style={[styles.ring, ringStyle]}
      />

      {/* Middle pulse ring */}
      <Animated.View
        style={[styles.ring, ringStyle, { transform: [{ scale: 0.75 }] }]}
      />

      {/* Logo container */}
      <Animated.View
        entering={FadeIn.duration(800)}
        style={commonStyles.itemsCenter}
      >

        <View style={styles.logoContainer}>
          <Shield size={48} color={theme.colors.info} />
        </View>

        {/* App Name */}
        <Animated.View entering={FadeInDown.duration(600).delay(400)}>
          <Text style={[commonStyles.textDisplay, styles.appName]}>
            MeroSuraksha
          </Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View entering={FadeInDown.duration(600).delay(600)}>
          <Text style={[commonStyles.textBody, styles.tagline]}>
            Your Digital Security Companion
          </Text>
        </Animated.View>

        {/* Animated dots loader */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(900)}
          style={styles.dotsContainer}
        >
          {[0, 1, 2].map((i) => (
            <AnimatedDot key={i} delay={i * 200} />
          ))}
        </Animated.View>

      </Animated.View>

      {/* Bottom tagline */}
      <Animated.View
        entering={FadeInDown.duration(600).delay(1000)}
        style={styles.bottomTagline}
      >
        <Text style={[commonStyles.textSmall, { textAlign: 'center' }]}>
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
      style={[styles.dot, dotStyle]}
    />
  );
}

const styles = StyleSheet.create({
  ring: {
    position: 'absolute',
    width: 192,
    height: 192,
    borderRadius: 96,
    borderWidth: 1,
    borderColor: theme.colors.infoBorder,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: theme.colors.infoDim,
    borderWidth: 1,
    borderColor: theme.colors.infoBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing['2xl'],
  },
  appName: {
    textAlign: 'center',
    letterSpacing: -0.56,
  },
  tagline: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing['4xl'],
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.infoText,
  },
  bottomTagline: {
    position: 'absolute',
    bottom: 48,
  },
});