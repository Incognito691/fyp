import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const commonStyles = StyleSheet.create({
  // Screen Layouts
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.screenPadding,
  },
  screenCentered: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.screenPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Glass Cards
  glassCard: {
    backgroundColor: theme.colors.glassDefault,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.cardPadding,
  },
  glassCardStrong: {
    backgroundColor: theme.colors.glassStrong,
    borderWidth: 1,
    borderColor: theme.colors.border.strong,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.cardPadding,
  },
  glassCardSafe: {
    backgroundColor: theme.colors.safeDim,
    borderWidth: 1,
    borderColor: theme.colors.safeBorder,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.cardPadding,
  },
  glassCardWarning: {
    backgroundColor: theme.colors.warningDim,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.cardPadding,
  },
  glassCardDanger: {
    backgroundColor: theme.colors.dangerDim,
    borderWidth: 1,
    borderColor: theme.colors.dangerBorder,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.cardPadding,
  },
  glassCardInfo: {
    backgroundColor: theme.colors.infoDim,
    borderWidth: 1,
    borderColor: theme.colors.infoBorder,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.cardPadding,
  },

  // Typography
  textDisplay: {
    ...theme.typography.display,
    color: theme.colors.text.primary,
  },
  textH1: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
  },
  textH2: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
  },
  textH3: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  textBody: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },
  textBodySecondary: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  textSmall: {
    ...theme.typography.small,
    color: theme.colors.text.tertiary,
  },
  textLabel: {
    ...theme.typography.label,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
  },

  // Flex helpers
  flexRow: {
    flexDirection: 'row',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },

  // Divider
  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.subtle,
    marginVertical: theme.spacing.lg,
  },
});
