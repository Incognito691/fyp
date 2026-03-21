import React from "react";
import { View, ScrollView, TouchableOpacity, ActivityIndicator, Text } from "react-native";
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

export default function LoginScreen() {
  const { login, user, googleLogin } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

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

  // Redirect if already logged in
  React.useEffect(() => {
    if (user?.hasOnboarded) {
      router.replace("/(main)/home");
    } else if (user) {
      router.replace("/(auth)/onboarding");
    }
  }, [user]);

  const onSubmit = async (data: LoginInput) => {
    setError(null);
    setLoading(true);

    const result = await login(data);

    setLoading(false);

    if (!result.success) {
      setError(result.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);

    try {
      // TODO: Implement Google Sign-In
      // For now, show a message
      setError("Google Sign-In coming soon!");
    } catch (error) {
      setError("Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-900">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center px-6 py-8 min-h-screen">
          {/* Header */}
          <AuthHeader
            title="Welcome Back"
            subtitle="Protect yourself from scams and threats"
            icon="shield"
          />

          {/* Error Alert */}
          {error && (
            <Animated.View
              entering={FadeInUp.duration(300)}
            >
              <Alert message={error} type="error" />
            </Animated.View>
          )}

          {/* Login Form */}
          <Animated.View
            entering={FadeInUp.duration(500).delay(100)}
            className="gap-4"
          >
            {/* Google Login Button */}
            <GoogleAuthButton
              onPress={handleGoogleLogin}
              loading={googleLoading}
              text="Sign in with Google"
            />

            {/* Divider */}
            <FormDivider />

            {/* Email Input */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View className="gap-1">
                  <Text className="text-gray-300 text-sm font-medium">Email Address</Text>
                  <Input
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    type="email"
                    error={errors.email?.message}
                    icon={Mail}
                  />
                </View>
              )}
            />

            {/* Password Input */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View className="gap-1">
                  <Text className="text-gray-300 text-sm font-medium">Password</Text>
                  <Input
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    type="password"
                    error={errors.password?.message}
                    icon={Lock}
                  />
                </View>
              )}
            />

            {/* Login Button */}
            <TouchableOpacity
              className="bg-blue-500 h-12 rounded-xl px-6 flex-row items-center justify-center"
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text className="text-white font-semibold text-base">Sign In</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Footer */}
          <AuthFooter
            question="Don't have an account?"
            linkText="Create Account"
            linkRoute="/(auth)/register"
          />

          {/* Loading State */}
          {loading && <Loading message="Signing in..." />}
        </View>
      </ScrollView>
    </View>
  );
}
