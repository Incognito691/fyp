import React from "react";
import { Phone } from "lucide-react-native";
import { Input } from "@/shared/components/input";
import type { PhoneInputProps } from "../types/verification.types";

export function PhoneInput({
  value,
  onChangeText,
  error,
  placeholder = "Enter phone number",
  disabled = false,
}: PhoneInputProps) {
  // Filter input to allow only valid phone characters
  const handleChange = (text: string) => {
    // Allow digits, +, -, space, and parentheses
    const filtered = text.replace(/[^0-9+\-() ]/g, "");
    onChangeText(filtered);
  };

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={handleChange}
      error={error}
      keyboardType="phone-pad"
      icon={Phone}
      autoCapitalize="none"
    />
  );
}
