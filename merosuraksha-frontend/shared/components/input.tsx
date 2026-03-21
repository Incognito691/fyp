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
        className={`
          flex-row items-center rounded-xl h-12 px-4 border
          ${error
            ? "bg-red-900/20 border-red-500/50"
            : "bg-gray-800/50 border-gray-600/50"
          }
        `}
      >
        {IconComponent && (
          <View className="mr-3">
            <IconComponent
              size={20}
              color={error ? "#EF4444" : "#9CA3AF"}
            />
          </View>
        )}

        <TextInput
          className="flex-1 text-base text-white"
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={type === "password" && !showPassword}
          autoCapitalize={type === "email" ? "none" : "sentences"}
          keyboardType={type === "email" ? "email-address" : "default"}
        />

        {type === "password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="ml-3"
          >
            {showPassword ? (
              <EyeOff size={20} color="#6B7280" />
            ) : (
              <Eye size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text className="text-red-400 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}
