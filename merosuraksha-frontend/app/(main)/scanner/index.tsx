import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { commonStyles, theme } from '@/shared/styles';

export default function ScannerScreen() {
    return (
        <View style={commonStyles.screenCentered}>
            <Text style={[commonStyles.textH2, styles.title]}>Scanner</Text>
            <Text style={[commonStyles.textBodySecondary, styles.subtitle]}>
                Scanner functionality coming soon...
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        textAlign: 'center',
    },
});
