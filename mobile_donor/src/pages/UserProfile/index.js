import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import styles from './styles';
import api from '../../services/api';
import logo from '../../assets/Logo.png'


export default function UserProfile() {
    const navigation = useNavigation();
    // const { id } = route.params;

    async function handleLogout() {
        await AsyncStorage.clear();

        navigation.reset({
            index: 0,
            routes: [{ name: 'Index' }],
        });
    }

    function createTwoButtonAlert() {
        Alert.alert(
            "Logout",
            "Deseja sair de sua conta?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: handleLogout
                }
            ],
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={createTwoButtonAlert}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>
            <View style={styles.cardsContainer}>

            </View>

            <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-around', borderWidth: 1, borderColor: 'rgb(196, 196, 196)', backgroundColor: '#fff' }}>

            </View>
        </SafeAreaView>
    )
}