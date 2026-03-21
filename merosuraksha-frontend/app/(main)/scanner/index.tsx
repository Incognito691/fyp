import React from 'react';
import { View, Text } from 'react-native';

export default function ScannerScreen() {
    return (
        <View className="flex-1 bg-background justify-center items-center">
            <Text className="text-lg font-semibold text-text">Scanner</Text>
            <Text className="text-sm text-textSecondary mt-2">Scanner functionality coming soon...</Text>
        </View>
    );
}