import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Eye, EyeOff, LucideIcon } from "lucide-react-native";
import { theme, commonStyles } from "@/shared/styles";

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  icon?: LucideIcon;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  className?: string;
}

export function Input({
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  icon: IconComponent,
  keyboardType = "default",
  autoCapitalize = "none",
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[
        styles.inputWrapper,
        error ? styles.inputError : styles.inputDefault
      ]}>
        {IconComponent && (
          <View style={styles.iconContainer}>
            <IconComponent
              size={20}
              color={error ? theme.colors.dangerText : theme.colors.text.secondary}
            />
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.tertiary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            {showPassword ? (
              <EyeOff size={20} color={theme.colors.text.secondary} />
            ) : (
              <Eye size={20} color={theme.colors.text.secondary} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
    height: theme.sizes.input,
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 1,
  },
  inputDefault: {
    backgroundColor: theme.colors.glassDefault,
    borderColor: theme.colors.border.default,
  },
  inputError: {
    backgroundColor: theme.colors.dangerDim,
    borderColor: theme.colors.dangerBorder,
  },
  iconContainer: {
    marginRight: theme.spacing.md,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },
  eyeIcon: {
    marginLeft: theme.spacing.md,
  },
  errorText: {
    ...theme.typography.small,
    color: theme.colors.dangerText,
    marginTop: theme.spacing.xs,
  },
});
