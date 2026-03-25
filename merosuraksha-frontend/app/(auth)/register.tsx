import React from "react";
import { View, ScrollView, TouchableOpacity, ActivityIndicator, Text, StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User } from "lucide-react-native";
import { router } from "expo-router";

import { useAuth } from "../../features/auth/hooks/use-auth";
import { Input, Alert, Loading } from "../../shared/components";
import { AuthHeader } from "../../shared/components/auth-header";
import { GoogleAuthButton } from "../../shared/components/google-auth-button";
import { FormDivider } from "../../shared/components/form-divider";
import { AuthFooter } from "../../shared/components/auth-footer";
import {
  registerSchema,
  type RegisterInput,
} from "../../features/auth/utils/validation";
import { theme, commonStyles, buttonStyles } from "@/shared/styles";

export default function RegisterScreen() {
  const { register: registerUser, googleLogin, user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Redirect after successful registration
  React.useEffect(() => {
    if (user) {
      if (user.hasOnboarded) {
        router.replace("/(main)/home");
      } else {
        router.replace("/(auth)/onboarding");
      }
    }
  }, [user]);

  const onSubmit = async (data: RegisterInput) => {
    setError(null);
    setLoading(true);

    const result = await registerUser(data);

    setLoading(false);

    if (!result.success) {
      setError(result.message || "Registration failed");
    }
    // Success case is handled by useEffect in auth context
    // User will be automatically redirected to onboarding
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);

    try {
      setError("Google Sign-In coming soon!");
    } catch (error) {
      setError("Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <View style={commonStyles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          <AuthHeader
            title="Create Account"
            subtitle="Join MeroSuraksha and stay protected"
            icon="user"
          />

          {error && (
            <Animated.View entering={FadeInUp.duration(300)}>
              <Alert message={error} type="error" />
            </Animated.View>
          )}

          <Animated.View
            entering={FadeInUp.duration(500).delay(100)}
            style={styles.formContainer}
          >
            <GoogleAuthButton
              onPress={handleGoogleLogin}
              loading={googleLoading}
              text="Sign up with Google"
            />

            <FormDivider />

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <Input
                    placeholder="Enter your full name"
                    value={value}
                    onChangeText={onChange}
                    error={errors.name?.message}
                    icon={User}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <Input
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    error={errors.email?.message}
                    icon={Mail}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <Input
                    placeholder="Create a strong password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                    error={errors.password?.message}
                    icon={Lock}
                  />
                </View>
              )}
            />

            <TouchableOpacity
              style={[buttonStyles.btnPrimary, styles.registerButton]}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={buttonStyles.btnPrimaryText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          <AuthFooter
            question="Already have an account?"
            linkText="Sign In"
            linkRoute="/(auth)/login"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: theme.spacing['3xl'],
    minHeight: '100%',
  },
  formContainer: {
    gap: theme.spacing.lg,
  },
  inputGroup: {
    gap: theme.spacing.xs,
  },
  label: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  registerButton: {
    width: '100%',
  },
});
