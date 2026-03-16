import React from "react";
import { Text } from "react-native";
import { MotiView } from "moti";
import { AlertCircle, CheckCircle } from "lucide-react-native";

interface AlertProps {
  message: string;
  type?: "error" | "success";
}

export function Alert({ message, type = "error" }: AlertProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      className={`flex-row items-center p-4 rounded-lg mb-4 ${
        type === "error" ? "bg-danger/10" : "bg-success/10"
      }`}
    >
      {type === "error" ? (
        <AlertCircle size={20} color="#FF3B30" />
      ) : (
        <CheckCircle size={20} color="#34C759" />
      )}
      <Text
        className={`ml-3 flex-1 ${
          type === "error" ? "text-danger" : "text-success"
        }`}
      >
        {message}
      </Text>
    </MotiView>
  );
}
