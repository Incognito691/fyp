import React from "react";
import { View, ScrollView, TouchableOpacity, ActivityIndicator, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Mail, Lock } from "lucide-react-native";

import { useAuth } from "../../features/auth/hooks/use-auth";
import { Input, Alert, Loading } from "../../shared/components";
import { AuthHeader } from "../../shared/components/auth-header";
import { GoogleAuthButton } from "../../shared/components/google-auth-button";
import { FormDivider } from "../../shared/components/form-divider";
import { AuthFooter } from "../../shared/components/auth-footer";
import {
  loginSchema,
  type LoginInput,
} from "../../features/auth/utils/validation";
import { theme, commonStyles, buttonStyles } from "@/shared/styles";

export default function LoginScreen() {
  const { login, user, googleLogin } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const isSubmitting = React.useRef(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  React.useEffect(() => {
    if (user?.hasOnboarded) {
      router.replace("/(main)/home");
    } else if (user) {
      router.replace("/(auth)/onboarding");
    }
  }, [user]);

  const onSubmit = async (data: LoginInput) => {
    // Prevent multiple simultaneous submissions
    if (isSubmitting.current) {
      console.log("Already submitting, ignoring duplicate request");
      return;
    }

    console.log("Starting login with:", data.email);
    isSubmitting.current = true;
    setError(null);
    setLoading(true);

    try {
      const result = await login(data);
      console.log("Login result:", result);
      
      if (!result.success) {
        console.log("Login failed:", result.message);
        setError(result.message || "Login failed");
        setLoading(false);
        isSubmitting.current = false;
      } else {
        console.log("Login successful, waiting for redirect");
      }
      // If success, don't reset - let the redirect happen
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
      setLoading(false);
      isSubmitting.current = false;
    }
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
            title="Welcome Back"
            subtitle="Protect yourself from scams and threats"
            icon="shield"
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
              text="Sign in with Google"
            />

            <FormDivider />

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
                    placeholder="Enter your password"
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
              style={[buttonStyles.btnPrimary, styles.signInButton]}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={buttonStyles.btnPrimaryText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          <AuthFooter
            question="Don't have an account?"
            linkText="Create Account"
            linkRoute="/(auth)/register"
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
  signInButton: {
    width: '100%',
  },
});
