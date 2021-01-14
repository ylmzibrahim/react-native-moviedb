import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StatusBar, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';

function SplashScreen({ navigation, route }) {

    useEffect(() => {
        setTimeout(() => {
            navigation.dispatch(
                StackActions.replace('Home')
            )
        }, 3000); // 3 secs
    })

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <Text style={styles.text}>SplashScreen</Text>
        </SafeAreaView>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0f102b',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 40,
    }
});