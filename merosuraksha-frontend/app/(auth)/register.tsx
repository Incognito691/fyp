import React from "react";
import { View, ScrollView, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User } from "lucide-react-native";

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

export default function RegisterScreen() {
  const { register: registerUser, googleLogin } = useAuth();
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

  const onSubmit = async (data: RegisterInput) => {
    setError(null);
    setLoading(true);

    const result = await registerUser(data);

    setLoading(false);

    if (!result.success) {
      setError(result.message || "Registration failed");
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
    <View className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center px-screen-padding py-section-gap min-h-screen">
          {/* Header */}
          <AuthHeader
            title="Create Account"
            subtitle="Join MeroSuraksha and stay protected"
            icon="user"
          />

          {/* Error Alert */}
          {error && (
            <Animated.View
              entering={FadeInUp.duration(300)}
            >
              <Alert message={error} type="error" />
            </Animated.View>
          )}

          {/* Register Form */}
          <Animated.View
            entering={FadeInUp.duration(500).delay(100)}
            className="gap-lg"
          >
            {/* Google Login Button */}
            <GoogleAuthButton
              onPress={handleGoogleLogin}
              loading={googleLoading}
              text="Sign up with Google"
            />

            {/* Divider */}
            <FormDivider />

            {/* Name Input */}
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <View className="gap-xs">
                  <Text className="input-label">Full Name</Text>
                  <Input
                    placeholder="Enter your full name"
                    value={value}
                    onChangeText={onChange}
                    type="text"
                    error={errors.name?.message}
                    icon={User}
                  />
                </View>
              )}
            />

            {/* Email Input */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View className="gap-xs">
                  <Text className="input-label">Email Address</Text>
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
                <View className="gap-xs">
                  <Text className="input-label">Password</Text>
                  <Input
                    placeholder="Create a strong password"
                    value={value}
                    onChangeText={onChange}
                    type="password"
                    error={errors.password?.message}
                    icon={Lock}
                  />
                </View>
              )}
            />

            {/* Register Button */}
            <TouchableOpacity
              className="btn-primary"
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text className="btn-primary-text">Create Account</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Footer */}
          <AuthFooter
            question="Already have an account?"
            linkText="Sign In"
            linkRoute="/(auth)/login"
          />

          {/* Loading State */}
          {loading && <Loading message="Creating account..." />}
        </View>
      </ScrollView>
    </View>
  );
}
