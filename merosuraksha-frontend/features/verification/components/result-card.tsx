import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Shield, AlertTriangle } from "lucide-react-native";
import { theme, commonStyles } from "@/shared/styles";
import type { ResultCardProps } from "../types/verification.types";

export function ResultCard({
  riskLevel,
  riskScore,
  totalReports,
  scamTypes,
}: ResultCardProps) {
  // Map risk level to display text
  const getRiskText = () => {
    switch (riskLevel) {
      case "LOW":
        return "Safe";
      case "MEDIUM":
        return "Suspicious";
      case "HIGH":
        return "Scam";
      default:
        return "Unknown";
    }
  };

  // Map risk level to card style
  const getCardStyle = () => {
    switch (riskLevel) {
      case "LOW":
        return commonStyles.glassCardSafe;
      case "MEDIUM":
        return commonStyles.glassCardWarning;
      case "HIGH":
        return commonStyles.glassCardDanger;
      default:
        return commonStyles.glassCard;
    }
  };

  // Map risk level to text color
  const getTextColor = () => {
    switch (riskLevel) {
      case "LOW":
        return theme.colors.safeText;
      case "MEDIUM":
        return theme.colors.warningText;
      case "HIGH":
        return theme.colors.dangerText;
      default:
        return theme.colors.text.primary;
    }
  };

  // Map risk level to icon
  const Icon = riskLevel === "LOW" ? Shield : AlertTriangle;
  const iconColor = getTextColor();

  return (
    <View style={[getCardStyle(), styles.card]}>
      {/* Icon and Risk Level */}
      <View style={styles.header}>
        <Icon size={32} color={iconColor} />
        <Text style={[styles.riskText, { color: iconColor }]}>
          {getRiskText()}
        </Text>
      </View>

      {/* Risk Score */}
      <View style={styles.row}>
        <Text style={commonStyles.textBodySecondary}>Risk Score:</Text>
        <Text style={[commonStyles.textH2, { color: iconColor }]}>
          {riskScore}%
        </Text>
      </View>

      {/* Total Reports */}
      <View style={styles.row}>
        <Text style={commonStyles.textBodySecondary}>Total Reports:</Text>
        <Text style={commonStyles.textBody}>{totalReports}</Text>
      </View>

      {/* Scam Types (conditional) */}
      {scamTypes.length > 0 && (
        <View style={styles.scamTypesContainer}>
          <Text style={commonStyles.textBodySecondary}>Scam Types:</Text>
          <Text style={commonStyles.textBody}>
            {scamTypes.join(", ")}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: theme.spacing.xl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  riskText: {
    ...theme.typography.h1,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  scamTypesContainer: {
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.subtle,
  },
});
