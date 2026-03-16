import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MotiView } from "moti";
import { Mail, Lock, User } from "lucide-react-native";

import { useAuth } from "../../features/auth/hooks/use-auth";
import { Button, Input, Alert } from "../../shared/components";
import {
  registerSchema,
  type RegisterInput,
} from "../../features/auth/utils/validation";

export default function RegisterScreen() {
  const { register: registerUser } = useAuth();
  const [loading, setLoading] = React.useState(false);
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
          <Text className="text-3xl font-bold text-text">Create Account</Text>
          <Text className="text-textSecondary mt-2">
            Join MeroSuraksha today
          </Text>
        </MotiView>

        {/* Error Alert */}
        {error && <Alert message={error} type="error" />}

        {/* Register Form */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 100 }}
        >
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Full Name"
                value={value}
                onChangeText={onChange}
                type="text"
                error={errors.name?.message}
                icon={User}
              />
            )}
          />

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
            title="Create Account"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
            size="lg"
            className="mt-4"
          />
        </MotiView>

        {/* Login Link */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 500, delay: 200 }}
          className="mt-6 items-center"
        >
          <Text className="text-textSecondary">Already have an account?</Text>
          <Text className="text-primary font-semibold mt-1">Login</Text>
        </MotiView>
      </View>
    </ScrollView>
  );
}
