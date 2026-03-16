import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Eye, EyeOff, LucideIcon } from "lucide-react-native";

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: "text" | "email" | "password";
  error?: string;
  icon?: LucideIcon;
  className?: string;
}

export function Input({
  placeholder,
  value,
  onChangeText,
  type = "text",
  error,
  icon: IconComponent,
  className = "",
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View className={`mb-4 ${className}`}>
      <View
        className={`flex-row items-center border-2 rounded-lg bg-white ${
          error ? "border-danger" : "border-border"
        }`}
      >
        {IconComponent && (
          <View className="pl-3">
            <IconComponent size={20} color={error ? "#FF3B30" : "#86868b"} />
          </View>
        )}

        <TextInput
          className="flex-1 h-12 px-4 text-base text-text"
          placeholder={placeholder}
          placeholderTextColor="#86868b"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={type === "password" && !showPassword}
          autoCapitalize={type === "email" ? "none" : "sentences"}
          keyboardType={type === "email" ? "email-address" : "default"}
        />

        {type === "password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="pr-3"
          >
            {showPassword ? (
              <EyeOff size={20} color="#86868b" />
            ) : (
              <Eye size={20} color="#86868b" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text className="text-danger text-sm mt-1">{error}</Text>}
    </View>
  );
}
