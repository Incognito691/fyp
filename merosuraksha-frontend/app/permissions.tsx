import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { openSettings } from 'expo-linking';

type PermissionStatus = 'loading' | 'requesting' | 'granted' | 'denied';

export default function PermissionsScreen() {
  const router = useRouter();
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('loading');
  const [currentPermission, setCurrentPermission] = useState<string>('');

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    setPermissionStatus('loading');

    // Check for notifications permission
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      if (existingStatus !== 'granted') {
        setPermissionStatus('requesting');
        setCurrentPermission('Notifications');
        return;
      }
    }

    // Check for location permission
    try {
      const { Location } = await import('expo-location');
      const { status: locationStatus } = await Location.getForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        setPermissionStatus('requesting');
        setCurrentPermission('Location');
        return;
      }
    } catch (error) {
      console.log('Location not available');
    }

    // Check for camera permission
    try {
      const { Camera } = await import('expo-camera');
      const { status: cameraStatus } = await Camera.getCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        setPermissionStatus('requesting');
        setCurrentPermission('Camera');
        return;
      }
    } catch (error) {
      console.log('Camera not available');
    }

    setPermissionStatus('granted');
    setTimeout(() => {
      router.replace('/(auth)');
    }, 1000);
  };

  const requestPermissions = async () => {
    setPermissionStatus('requesting');

    // Request notifications permission
    if (Device.isDevice) {
      setCurrentPermission('Notifications');
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'This app needs notification permission to send you important alerts.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => openSettings() }
          ]
        );
        setPermissionStatus('denied');
        return;
      }
    }

    // Request location permission
    try {
      const { Location } = await import('expo-location');
      setCurrentPermission('Location');
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'This app needs location permission to provide location-based features.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => openSettings() }
          ]
        );
        setPermissionStatus('denied');
        return;
      }
    } catch (error) {
      console.log('Location not available');
    }

    // Request camera permission
    try {
      const { Camera } = await import('expo-camera');
      setCurrentPermission('Camera');
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'This app needs camera permission for scanning features.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => openSettings() }
          ]
        );
        setPermissionStatus('denied');
        return;
      }
    } catch (error) {
      console.log('Camera not available');
    }

    setPermissionStatus('granted');
    setTimeout(() => {
      router.replace('/(auth)');
    }, 1000);
  };

  const renderContent = () => {
    switch (permissionStatus) {
      case 'loading':
        return (
          <View style={styles.contentContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.title}>Checking permissions...</Text>
          </View>
        );

      case 'requesting':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Permissions Required</Text>
            <Text style={styles.subtitle}>
              This app needs access to your {currentPermission} to provide the best experience.
            </Text>
            <TouchableOpacity style={styles.button} onPress={requestPermissions}>
              <Text style={styles.buttonText}>Grant Permissions</Text>
            </TouchableOpacity>
          </View>
        );

      case 'granted':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>All Set!</Text>
            <Text style={styles.subtitle}>Permissions granted successfully.</Text>
            <ActivityIndicator size="small" color="#007AFF" />
          </View>
        );

      case 'denied':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Permission Denied</Text>
            <Text style={styles.subtitle}>
              Some permissions were denied. You can enable them in settings.
            </Text>
            <TouchableOpacity style={styles.button} onPress={requestPermissions}>
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => openSettings()}>
              <Text style={styles.secondaryButtonText}>Open Settings</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentContainer: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    marginTop: 12,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
