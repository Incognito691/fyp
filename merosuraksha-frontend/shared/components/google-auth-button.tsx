import React from "react";
import { TouchableOpacity, ActivityIndicator, Text, View, StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Chrome } from "lucide-react-native";
import { theme, commonStyles, buttonStyles } from "@/shared/styles";

interface GoogleAuthButtonProps {
  text: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function GoogleAuthButton({ text, onPress, loading = false, disabled = false }: GoogleAuthButtonProps) {
  return (
    <Animated.View entering={FadeInUp.duration(500)}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={disabled || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.infoText} />
        ) : (
          <>
            <Chrome size={20} color={theme.colors.infoText} />
            <Text style={[commonStyles.textBody, styles.text]}>
              {text}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.glassDefault,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    height: theme.sizes.btn,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.xl + 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  text: {
    fontWeight: '600',
  },
});
