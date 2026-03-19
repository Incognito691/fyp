import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MotiView } from "moti";
import { Mail, Lock } from "lucide-react-native";

import { useAuth } from "../../features/auth/hooks/use-auth";
import { Button, Input, Alert, Loading } from "../../shared/components";
import {
  loginSchema,
  type LoginInput,
} from "../../features/auth/utils/validation";

export default function LoginScreen() {
  const { login, user } = useAuth();
  const [loading, setLoading] = React.useState(false);
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

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
          className="mb-8"
        >
          <Text className="text-3xl font-bold text-text">MeroSuraksha</Text>
          <Text className="text-textSecondary mt-2">
            Protect yourself from scams
          </Text>
        </MotiView>

        {/* Error Alert */}
        {error && <Alert message={error} type="error" />}

        {/* Login Form */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 100 }}
        >
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                type="email"
                error={errors.email?.message}
                icon={Mail}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                type="password"
                error={errors.password?.message}
                icon={Lock}
              />
            )}
          />

          <Button
            title="Login"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
            size="lg"
            className="mt-4"
          />
        </MotiView>

        {/* Register Link */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 500, delay: 200 }}
          className="mt-6 items-center"
        >
          <Text className="text-textSecondary">
            Don&apos;t have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
            <Text className="text-primary font-semibold mt-1">
              Create Account
            </Text>
          </TouchableOpacity>
        </MotiView>

        {/* Loading State */}
        {loading && <Loading message="Signing in..." />}
      </View>
    </ScrollView>
  );
}
