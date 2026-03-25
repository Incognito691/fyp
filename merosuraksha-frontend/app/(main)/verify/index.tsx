import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { theme, commonStyles } from "@/shared/styles";
import { Button, Alert } from "@/shared/components";
import { PhoneInput } from "@/features/verification/components/phone-input";
import { ResultCard } from "@/features/verification/components/result-card";
import { verificationApi } from "@/features/verification/api/verification-api";
import type { VerificationResponse } from "@/features/verification/types/verification.types";

export default function VerifyScreen() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<VerificationResponse | null>(null);

  // Handle phone number input change
  const handlePhoneChange = (text: string) => {
    setPhoneNumber(text);
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  // Handle verification
  const handleVerify = async () => {
    // Validate input
    if (!phoneNumber.trim()) {
      setError("Please enter a phone number");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await verificationApi.verifyNumber(phoneNumber);
      setResult(response);
    } catch (err) {
      // Handle different error types
      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED") {
          setError("Request timed out");
        } else if (err.code === "ERR_NETWORK") {
          setError("Unable to connect to server");
        } else if (err.response?.status === 401) {
          setError("Authentication failed");
        } else {
          setError(err.response?.data?.message || "Verification failed");
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={commonStyles.screen}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.container}>
        {/* Header */}
        <Text style={[commonStyles.textH1, styles.title]}>
          Verify Phone Number
        </Text>
        <Text style={[commonStyles.textBodySecondary, styles.subtitle]}>
          Check if a phone number is safe or associated with scam activity
        </Text>

        {/* Phone Input */}
        <PhoneInput
          value={phoneNumber}
          onChangeText={handlePhoneChange}
          error={error}
          placeholder="Enter phone number"
          disabled={loading}
        />

        {/* Verify Button */}
        <Button
          text={loading ? "Verifying..." : "Verify"}
          onPress={handleVerify}
          disabled={!phoneNumber.trim() || loading}
        />

        {/* Loading Indicator */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.info} />
            <Text style={[commonStyles.textBodySecondary, styles.loadingText]}>
              Checking database...
            </Text>
          </View>
        )}

        {/* Error Alert */}
        {error && !loading && (
          <Alert
            message={error}
            type="error"
          />
        )}

        {/* Result Card */}
        {result && !loading && (
          <ResultCard
            riskLevel={result.riskLevel}
            riskScore={result.riskScore}
            totalReports={result.totalReports}
            scamTypes={result.scamTypes}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingVertical: theme.spacing.xl,
  },
  container: {
    flex: 1,
  },
  title: {
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    marginBottom: theme.spacing['3xl'],
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: theme.spacing.xl,
  },
  loadingText: {
    marginTop: theme.spacing.md,
  },
});
