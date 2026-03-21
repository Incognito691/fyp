import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { useCameraPermissions } from 'expo-camera';
import { openSettings } from 'expo-linking';
import Animated, { FadeIn, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { Bell, MapPin, Camera, Shield, CheckCircle, AlertCircle, Settings } from 'lucide-react-native';

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

    // Check notifications
    if (Device.isDevice) {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        setCurrentPermission('Notifications');
        setPermissionStatus('requesting');
        return;
      }
    }

    // Check location
    const { status: locationStatus } = await Location.getForegroundPermissionsAsync();
    if (locationStatus !== 'granted') {
      setCurrentPermission('Location');
      setPermissionStatus('requesting');
      return;
    }

    // Check camera
    if (!cameraPermission?.granted) {
      setCurrentPermission('Camera');
      setPermissionStatus('requesting');
      return;
    }

    // All granted
    setPermissionStatus('granted');
    setTimeout(() => router.replace('/(auth)/login'), 1000);
  };

  const requestPermissions = async () => {
    // Request notifications
    if (Device.isDevice) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        showDeniedAlert('Notifications');
        setPermissionStatus('denied');
        return;
      }
    }

    // Request location
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    if (locationStatus !== 'granted') {
      showDeniedAlert('Location');
      setPermissionStatus('denied');
      return;
    }

    // Request camera
    const result = await requestCameraPermission();
    if (!result.granted) {
      showDeniedAlert('Camera');
      setPermissionStatus('denied');
      return;
    }

    setPermissionStatus('granted');
    setTimeout(() => router.replace('/(auth)/login'), 1000);
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
      case 'Notifications': return <Bell size={24} color="#60A5FA" />;
      case 'Location': return <MapPin size={24} color="#60A5FA" />;
      case 'Camera': return <Camera size={24} color="#60A5FA" />;
      default: return <Shield size={24} color="#60A5FA" />;
    }
  };

  const renderContent = () => {
    switch (permissionStatus) {
      case 'loading':
        return (
          <Animated.View entering={FadeIn.duration(500)} className="items-center gap-6">
            <Animated.View entering={ZoomIn.duration(600)}>
              <View className="glass-card-strong p-6 rounded-full">
                <ActivityIndicator size="large" color="#60A5FA" />
              </View>
            </Animated.View>
            <Animated.View entering={FadeInUp.duration(500).delay(200)} className="items-center gap-3">
              <Text className="text-h2 text-text-primary">Checking permissions...</Text>
              <Text className="text-body-secondary text-center">Setting up your security</Text>
            </Animated.View>
          </Animated.View>
        );

      case 'requesting':
        return (
          <Animated.View entering={FadeInUp.duration(500)} className="items-center gap-6 max-w-sm">
            <Animated.View entering={ZoomIn.duration(600)}>
              <View className="glass-card-strong p-6 rounded-full">
                {getPermissionIcon(currentPermission)}
              </View>
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(500).delay(200)} className="items-center gap-4">
              <Text className="text-h1 text-text-primary text-center">Permission Required</Text>
              <Text className="text-body-secondary text-center leading-6">
                MeroSuraksha needs access to your {currentPermission} to keep you protected from scams and threats.
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(500).delay(400)} className="w-full gap-3">
              <TouchableOpacity
                className="btn-primary"
                onPress={requestPermissions}
              >
                <Text className="btn-primary-text">Grant {currentPermission}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="btn-ghost"
                onPress={() => openSettings()}
              >
                <Text className="btn-ghost-text flex-row items-center gap-2">
                  <Settings size={16} />
                  Open Settings
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        );

      case 'granted':
        return (
          <Animated.View entering={FadeInUp.duration(500)} className="items-center gap-6">
            <Animated.View entering={ZoomIn.duration(600)}>
              <View className="glass-card-safe p-6 rounded-full">
                <CheckCircle size={32} color="#4ADE80" />
              </View>
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(500).delay(200)} className="items-center gap-3">
              <Text className="text-h1 text-safe-text text-center">All Protected!</Text>
              <Text className="text-body-secondary text-center">Taking you to your secure space...</Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(500).delay(400)}>
              <ActivityIndicator size="small" color="#4ADE80" />
            </Animated.View>
          </Animated.View>
        );

      case 'denied':
        return (
          <Animated.View entering={FadeInUp.duration(500)} className="items-center gap-6 max-w-sm">
            <Animated.View entering={ZoomIn.duration(600)}>
              <View className="glass-card-danger p-6 rounded-full">
                <AlertCircle size={32} color="#F87171" />
              </View>
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(500).delay(200)} className="items-center gap-4">
              <Text className="text-h1 text-danger-text text-center">Permission Denied</Text>
              <Text className="text-body-secondary text-center leading-6">
                Some permissions were denied. Enable them in settings to continue with full protection.
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(500).delay(400)} className="w-full gap-3">
              <TouchableOpacity
                className="btn-primary"
                onPress={requestPermissions}
              >
                <Text className="btn-primary-text">Try Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="btn-ghost"
                onPress={() => openSettings()}
              >
                <Text className="btn-ghost-text flex-row items-center gap-2">
                  <Settings size={16} />
                  Open Settings
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        );
    }
  };

  return (
    <View className="screen-centered">
      <StatusBar style="light" />
      {renderContent()}
    </View>
  );
}