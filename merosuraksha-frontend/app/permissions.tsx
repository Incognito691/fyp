import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { useCameraPermissions } from 'expo-camera';
import { openSettings } from 'expo-linking';
import Animated, { FadeIn, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { Bell, MapPin, Camera, CheckCircle, AlertCircle, Settings } from 'lucide-react-native';
import { theme, commonStyles, buttonStyles } from '@/shared/styles';

type PermissionStatus = 'loading' | 'requesting' | 'granted' | 'denied';

export default function PermissionsScreen() {
  const router = useRouter();
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('loading');
  const [currentPermission, setCurrentPermission] = useState<string>('');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  useEffect(() => {
    checkPermissions();
  }, [cameraPermission]);

  const checkPermissions = async () => {
    setPermissionStatus('loading');

    if (Device.isDevice) {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        setCurrentPermission('Notifications');
        setPermissionStatus('requesting');
        return;
      }
    }

    const { status: locationStatus } = await Location.getForegroundPermissionsAsync();
    if (locationStatus !== 'granted') {
      setCurrentPermission('Location');
      setPermissionStatus('requesting');
      return;
    }

    if (!cameraPermission?.granted) {
      setCurrentPermission('Camera');
      setPermissionStatus('requesting');
      return;
    }

    setPermissionStatus('granted');
    // After device permissions, go to SMS permission screen
    setTimeout(() => router.replace('/sms-permission'), 1000);
  };

  const requestPermissions = async () => {
    if (Device.isDevice) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        showDeniedAlert('Notifications');
        setPermissionStatus('denied');
        return;
      }
    }

    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    if (locationStatus !== 'granted') {
      showDeniedAlert('Location');
      setPermissionStatus('denied');
      return;
    }

    const result = await requestCameraPermission();
    if (!result.granted) {
      showDeniedAlert('Camera');
      setPermissionStatus('denied');
      return;
    }

    setPermissionStatus('granted');
    // After all device permissions granted, proceed to SMS permission
    setTimeout(() => router.replace('/sms-permission'), 1000);
  };

  const showDeniedAlert = (permission: string) => {
    Alert.alert(
      'Permission Required',
      `MeroSuraksha needs ${permission} permission to protect you effectively.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => openSettings() },
      ]
    );
  };

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case 'Notifications': return <Bell size={24} color={theme.colors.infoText} />;
      case 'Location': return <MapPin size={24} color={theme.colors.infoText} />;
      case 'Camera': return <Camera size={24} color={theme.colors.infoText} />;
      default: return <Bell size={24} color={theme.colors.infoText} />;
    }
  };

  const renderContent = () => {
    switch (permissionStatus) {
      case 'loading':
        return (
          <Animated.View entering={FadeIn.duration(500)} style={styles.container}>
            <Animated.View entering={ZoomIn.duration(600)}>
              <View style={[commonStyles.glassCardStrong, styles.iconContainer]}>
                <ActivityIndicator size="large" color={theme.colors.infoText} />
              </View>
            </Animated.View>
            <Animated.View entering={FadeInUp.duration(500).delay(200)} style={styles.textContainer}>
              <Text style={[commonStyles.textH2, styles.centerText]}>Checking permissions...</Text>
              <Text style={[commonStyles.textBodySecondary, styles.centerText]}>Setting up your security</Text>
            </Animated.View>
          </Animated.View>
        );

      case 'requesting':
        return (
          <Animated.View entering={FadeInUp.duration(500)} style={[styles.container, styles.maxWidth]}>
            <Animated.View entering={ZoomIn.duration(600)}>
              <View style={[commonStyles.glassCardStrong, styles.iconContainer]}>
                {getPermissionIcon(currentPermission)}
              </View>
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(500).delay(200)} style={styles.textContainer}>
              <Text style={[commonStyles.textH1, styles.centerText]}>Permission Required</Text>
              <Text style={[commonStyles.textBodySecondary, styles.centerText, styles.leadingText]}>
                MeroSuraksha needs access to your {currentPermission} to keep you protected from scams and threats.
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(500).delay(400)} style={styles.buttonContainer}>
              <TouchableOpacity
                style={buttonStyles.btnPrimary}
                onPress={requestPermissions}
              >
                <Text style={buttonStyles.btnPrimaryText}>Grant {currentPermission}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={buttonStyles.btnGhost}
                onPress={() => openSettings()}
              >
                <Settings size={16} color={theme.colors.text.secondary} />
                <Text style={buttonStyles.btnGhostText}>Open Settings</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        );

      case 'granted':
        return (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.container}>
            <Animated.View entering={ZoomIn.duration(600)}>
              <View style={[commonStyles.glassCardSafe, styles.iconContainer]}>
                <CheckCircle size={32} color={theme.colors.safeText} />
              </View>
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(500).delay(200)} style={styles.textContainer}>
              <Text style={[commonStyles.textH1, styles.centerText, { color: theme.colors.safeText }]}>All Protected!</Text>
              <Text style={[commonStyles.textBodySecondary, styles.centerText]}>Taking you to your secure space...</Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(500).delay(400)}>
              <ActivityIndicator size="small" color={theme.colors.safeText} />
            </Animated.View>
          </Animated.View>
        );

      case 'denied':
        return (
          <Animated.View entering={FadeInUp.duration(500)} style={[styles.container, styles.maxWidth]}>
            <Animated.View entering={ZoomIn.duration(600)}>
              <View style={[commonStyles.glassCardDanger, styles.iconContainer]}>
                <AlertCircle size={32} color={theme.colors.dangerText} />
              </View>
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(500).delay(200)} style={styles.textContainer}>
              <Text style={[commonStyles.textH1, styles.centerText, { color: theme.colors.dangerText }]}>Permission Denied</Text>
              <Text style={[commonStyles.textBodySecondary, styles.centerText, styles.leadingText]}>
                Some permissions were denied. Enable them in settings to continue with full protection.
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(500).delay(400)} style={styles.buttonContainer}>
              <TouchableOpacity
                style={buttonStyles.btnPrimary}
                onPress={requestPermissions}
              >
                <Text style={buttonStyles.btnPrimaryText}>Try Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={buttonStyles.btnGhost}
                onPress={() => openSettings()}
              >
                <Settings size={16} color={theme.colors.text.secondary} />
                <Text style={buttonStyles.btnGhostText}>Open Settings</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        );
    }
  };

  return (
    <View style={commonStyles.screenCentered}>
      <StatusBar style="light" />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.spacing['2xl'],
  },
  maxWidth: {
    maxWidth: 400,
  },
  iconContainer: {
    padding: theme.spacing['2xl'],
    borderRadius: 9999,
  },
  textContainer: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  centerText: {
    textAlign: 'center',
  },
  leadingText: {
    lineHeight: 21,
  },
  buttonContainer: {
    width: '100%',
    gap: theme.spacing.md,
  },
});
