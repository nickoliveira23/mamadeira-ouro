import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Index() {

    const navigation = useNavigation();

    function navigateLogin() {
        navigation.navigate('Login');
    }
    function navigateEmail() {
        navigation.navigate('Email');
    }

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Image source={require('../../assets/Logo.png')} style={styles.logo} />
                <Text style={styles.text}>
                    By tapping Create Account or Sign In, you agree with
                    our terms. Find out how we process your data at
                    our Privacy Policy and Cookies Policy.
                </Text>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={navigateEmail}>
                    <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonLogin]} onPress={navigateLogin}>
                    <Text style={styles.buttonText2}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}