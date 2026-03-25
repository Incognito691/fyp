import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const buttonStyles = StyleSheet.create({
  // Primary Button
  btnPrimary: {
    backgroundColor: theme.colors.info,
    height: theme.sizes.btn,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.xl + 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    ...theme.typography.body,
    fontWeight: '600',
  },

  // Secondary Button
  btnSecondary: {
    backgroundColor: theme.colors.glassDefault,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    height: theme.sizes.btn,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.xl + 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondaryText: {
    color: theme.colors.text.primary,
    ...theme.typography.body,
    fontWeight: '600',
  },

  // Danger Button
  btnDanger: {
    backgroundColor: theme.colors.dangerDim,
    borderWidth: 1,
    borderColor: theme.colors.dangerBorder,
    height: theme.sizes.btn,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.xl + 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDangerText: {
    color: theme.colors.dangerText,
    ...theme.typography.body,
    fontWeight: '600',
  },

  // Ghost Button
  btnGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
    height: theme.sizes.btn,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.xl + 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGhostText: {
    color: theme.colors.text.secondary,
    ...theme.typography.body,
    fontWeight: '600',
  },

  // Small Button
  btnSm: {
    height: theme.sizes.btnSm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.sm,
  },
});
