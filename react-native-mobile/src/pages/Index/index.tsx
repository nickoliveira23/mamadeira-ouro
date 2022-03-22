import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../Index/styles';

export default function Index() {
    const navigation = useNavigation();
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
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Email')}>
                    <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonLogin]} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText2}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}