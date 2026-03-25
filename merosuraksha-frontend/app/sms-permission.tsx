import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { MessageSquare, ShieldCheck, AlertCircle, Lock, Eye } from 'lucide-react-native';
import { openSettings } from 'expo-linking';
import { theme, commonStyles, buttonStyles } from '@/shared/styles';

type PermissionStatus = 'idle' | 'requesting' | 'granted' | 'denied';

// Feature bullet points shown on the permission screen
const FEATURES = [
  {
    icon: ShieldCheck,
    color: theme.colors.safeText,
    bg: theme.colors.safeDim,
    border: theme.colors.safeBorder,
    title: 'Scam Detection',
    description: 'AI scans your SMS for fraud and phishing attempts',
  },
  {
    icon: Lock,
    color: theme.colors.infoText,
    bg: theme.colors.infoDim,
    border: theme.colors.infoBorder,
    title: 'Private & Secure',
    description: 'Messages are analyzed locally — never stored on servers',
  },
  {
    icon: Eye,
    color: theme.colors.warningText,
    bg: theme.colors.warningDim,
    border: theme.colors.warningBorder,
    title: 'Real-time Alerts',
    description: 'Get instant warnings when a suspicious message arrives',
  },
];

export default function SmsPermissionScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<PermissionStatus>('idle');

  const requestSmsPermission = async () => {
    console.log('[SmsPermission] Requesting SMS read permission...');
    setStatus('requesting');

    // iOS does not support SMS reading — skip and navigate
    if (Platform.OS === 'ios') {
      console.log('[SmsPermission] iOS detected — SMS reading not supported, skipping');
      setStatus('granted');
      setTimeout(() => router.replace('/(main)/home'), 800);
      return;
    }

    // Web — not applicable
    if (Platform.OS === 'web') {
      console.log('[SmsPermission] Web detected — SMS reading not supported, skipping');
      setStatus('granted');
      setTimeout(() => router.replace('/(main)/home'), 800);
      return;
    }

    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'SMS Read Permission',
          message:
            'MeroSuraksha needs access to your SMS messages to detect scams and protect you from fraud.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
          buttonNeutral: 'Ask Me Later',
        }
      );

      console.log('[SmsPermission] Permission result:', result);

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('[SmsPermission] Permission granted');
        setStatus('granted');
        setTimeout(() => router.replace('/(main)/home'), 800);
      } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('[SmsPermission] Permission permanently denied');
        setStatus('denied');
        showPermanentDenialAlert();
      } else {
        console.log('[SmsPermission] Permission denied');
        setStatus('denied');
      }
    } catch (error) {
      console.error('[SmsPermission] Error requesting permission:', error);
      setStatus('denied');
    }
  };

  const showPermanentDenialAlert = () => {
    Alert.alert(
      'Permission Required',
      'SMS permission was permanently denied. Please enable it in your device settings to use scam detection.',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => setStatus('idle') },
        { text: 'Open Settings', onPress: () => openSettings() },
      ]
    );
  };

  const handleSkip = () => {
    console.log('[SmsPermission] User skipped SMS permission');
    router.replace('/(main)/home');
  };

  // Granted state
  if (status === 'granted') {
    return (
      <View style={commonStyles.screenCentered}>
        <StatusBar style="light" />
        <Animated.View entering={FadeInUp.duration(500)} style={styles.centeredContent}>
          <Animated.View entering={ZoomIn.duration(600)}>
            <View style={[commonStyles.glassCardSafe, styles.iconCircle]}>
              <ShieldCheck size={36} color={theme.colors.safeText} />
            </View>
          </Animated.View>
          <Animated.View entering={FadeInUp.duration(500).delay(200)} style={styles.textGroup}>
            <Text style={[commonStyles.textH1, styles.centerText, { color: theme.colors.safeText }]}>
              You're Protected!
            </Text>
            <Text style={[commonStyles.textBodySecondary, styles.centerText]}>
              MeroSuraksha is now monitoring your SMS for threats...
            </Text>
          </Animated.View>
          <Animated.View entering={FadeInUp.duration(500).delay(400)}>
            <ActivityIndicator size="small" color={theme.colors.safeText} />
          </Animated.View>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={commonStyles.screen}>
      <StatusBar style="light" />

      {/* Main scrollable content */}
      <Animated.View entering={FadeIn.duration(500)} style={styles.container}>

        {/* Header icon */}
        <Animated.View entering={ZoomIn.duration(600).delay(100)} style={styles.headerIcon}>
          <View style={styles.iconCircleLarge}>
            <MessageSquare size={44} color={theme.colors.infoText} />
          </View>
        </Animated.View>

        {/* Title block */}
        <Animated.View entering={FadeInUp.duration(500).delay(200)} style={styles.textGroup}>
          <Text style={[commonStyles.textDisplay, styles.centerText]}>
            Enable SMS Protection
          </Text>
          <Text style={[commonStyles.textBodySecondary, styles.centerText, styles.subtitleText]}>
            Allow MeroSuraksha to read your SMS messages so our AI can detect scams before they harm you.
          </Text>
        </Animated.View>

        {/* Feature cards */}
        <Animated.View entering={FadeInUp.duration(500).delay(350)} style={styles.featureList}>
          {FEATURES.map((feature, index) => (
            <FeatureRow key={index} feature={feature} />
          ))}
        </Animated.View>

        {/* Denied warning */}
        {status === 'denied' && (
          <Animated.View entering={FadeInUp.duration(300)} style={styles.deniedBanner}>
            <AlertCircle size={16} color={theme.colors.dangerText} />
            <Text style={styles.deniedText}>
              Permission denied. You can enable it in device settings.
            </Text>
          </Animated.View>
        )}

        {/* Action buttons */}
        <Animated.View entering={FadeInUp.duration(500).delay(500)} style={styles.buttonGroup}>
          <TouchableOpacity
            style={[buttonStyles.btnPrimary, styles.fullWidth]}
            onPress={requestSmsPermission}
            disabled={status === 'requesting'}
          >
            {status === 'requesting' ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={buttonStyles.btnPrimaryText}>
                {status === 'denied' ? 'Try Again' : 'Allow SMS Access'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[buttonStyles.btnGhost, styles.fullWidth]}
            onPress={handleSkip}
            disabled={status === 'requesting'}
          >
            <Text style={buttonStyles.btnGhostText}>Skip for Now</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Privacy note */}
        <Animated.View entering={FadeInUp.duration(500).delay(600)}>
          <Text style={[commonStyles.textSmall, styles.centerText, styles.privacyNote]}>
            Your messages are never uploaded or shared. Analysis happens on-device.
          </Text>
        </Animated.View>

      </Animated.View>
    </View>
  );
}

// Small reusable feature row component
function FeatureRow({ feature }: { feature: typeof FEATURES[0] }) {
  const Icon = feature.icon;
  return (
    <View style={styles.featureRow}>
      <View style={[styles.featureIconBox, { backgroundColor: feature.bg, borderColor: feature.border }]}>
        <Icon size={20} color={feature.color} />
      </View>
      <View style={styles.featureTextGroup}>
        <Text style={styles.featureTitle}>{feature.title}</Text>
        <Text style={styles.featureDescription}>{feature.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: theme.spacing['4xl'],
    gap: theme.spacing['3xl'],
  },
  centeredContent: {
    alignItems: 'center',
    gap: theme.spacing['2xl'],
  },
  headerIcon: {
    alignItems: 'center',
  },
  iconCircleLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: theme.colors.infoDim,
    borderWidth: 1,
    borderColor: theme.colors.infoBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    padding: theme.spacing['2xl'],
    borderRadius: 9999,
  },
  textGroup: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  centerText: {
    textAlign: 'center',
  },
  subtitleText: {
    maxWidth: 320,
    lineHeight: 22,
  },
  featureList: {
    gap: theme.spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.lg,
    backgroundColor: theme.colors.glassDefault,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
  },
  featureIconBox: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextGroup: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  featureTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  featureDescription: {
    ...theme.typography.small,
    color: theme.colors.text.secondary,
    lineHeight: 18,
  },
  deniedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.dangerDim,
    borderWidth: 1,
    borderColor: theme.colors.dangerBorder,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
  },
  deniedText: {
    ...theme.typography.small,
    color: theme.colors.dangerText,
    flex: 1,
  },
  buttonGroup: {
    gap: theme.spacing.md,
  },
  fullWidth: {
    width: '100%',
  },
  privacyNote: {
    paddingHorizontal: theme.spacing.xl,
    lineHeight: 18,
  },
});
