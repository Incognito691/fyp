// Design System Theme
export const theme = {
  // Colors
  colors: {
    // Backgrounds
    background: '#0D0D0F',
    card: '#161618',
    surface: '#1C1C1F',

    // Borders
    border: {
      default: 'rgba(255,255,255,0.08)',
      subtle: 'rgba(255,255,255,0.05)',
      strong: 'rgba(255,255,255,0.14)',
    },

    // Text
    text: {
      primary: '#FFFFFF',
      secondary: '#9CA3AF',
      tertiary: '#6B7280',
    },

    // Semantic - Solid
    safe: '#16A34A',
    warning: '#F97316',
    danger: '#EF4444',
    info: '#3B82F6',

    // Semantic - Dimmed
    safeDim: 'rgba(22,163,74,0.12)',
    warningDim: 'rgba(249,115,22,0.12)',
    dangerDim: 'rgba(239,68,68,0.12)',
    infoDim: 'rgba(59,130,246,0.12)',

    // Semantic - Text
    safeText: '#4ADE80',
    warningText: '#FB923C',
    dangerText: '#F87171',
    infoText: '#60A5FA',

    // Semantic - Borders
    safeBorder: 'rgba(22,163,74,0.25)',
    warningBorder: 'rgba(249,115,22,0.25)',
    dangerBorder: 'rgba(239,68,68,0.25)',
    infoBorder: 'rgba(59,130,246,0.25)',

    // Glass
    glassDefault: 'rgba(255,255,255,0.05)',
    glassStrong: 'rgba(255,255,255,0.09)',
  },

  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
    '5xl': 48,
    '6xl': 64,
    screenPadding: 20,
    cardPadding: 16,
    sectionGap: 24,
  },

  // Border Radius
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },

  // Typography
  typography: {
    display: {
      fontSize: 28,
      lineHeight: 33.6,
      fontWeight: '700' as const,
      letterSpacing: -0.56,
    },
    h1: {
      fontSize: 22,
      lineHeight: 28.6,
      fontWeight: '700' as const,
    },
    h2: {
      fontSize: 18,
      lineHeight: 24.3,
      fontWeight: '600' as const,
    },
    h3: {
      fontSize: 15,
      lineHeight: 21,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: 14,
      lineHeight: 22.4,
      fontWeight: '400' as const,
    },
    small: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '400' as const,
    },
    label: {
      fontSize: 11,
      lineHeight: 15.4,
      fontWeight: '500' as const,
      letterSpacing: 0.66,
    },
  },

  // Sizes
  sizes: {
    icon: {
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
    },
    avatar: 40,
    avatarLg: 56,
    btn: 48,
    btnSm: 38,
    input: 52,
    tabBar: 64,
    header: 56,
  },
} as const;
