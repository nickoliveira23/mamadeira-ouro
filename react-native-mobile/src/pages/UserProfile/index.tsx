import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigatorScreenParams } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Linking, ScrollView, Alert } from 'react-native';

import styles from './styles';
import api from '../../services/api';

export default function UserProfile({ route }) {
    const navigation = useNavigation();

    const { id } = route.params;

    console.log(id)

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
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View></View>


                    <View style={styles.header}>
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>      User</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ marginTop: 5 }} onPress={createTwoButtonAlert}>
                        <MaterialIcons name={'logout'} size={25} color={'#808080'}></MaterialIcons>
                    </TouchableOpacity>

                </View>

                <View style={styles.profile}>
                    <TouchableOpacity style={styles.icon} onPress={() => { }}>
                        <FontAwesome name={'pencil-square-o'} size={25} color={'#D3D3D3'}></FontAwesome>
                    </TouchableOpacity>
                    <View>
                        <View>
                            <Text style={[styles.profileProperty]}>NAME</Text>
                            <Text style={styles.profileValue}>Nickolas</Text>
                        </View>

                        <View>
                            <Text style={[styles.profileProperty]}>BIRTH</Text>
                            <Text style={styles.profileValue}>24/01/2000</Text>
                        </View>
                    </View>

                    <View>
                        <View>
                            <Text style={styles.profileProperty}>ADDRESS</Text>
                            <Text style={styles.profileValue}>Av. Brasil, 1477 - Vila Mogi Moderno, Mogi das Cruzes - SP, 08717-260</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.profileProperty]}>CONTACT</Text>
                        <Text style={styles.profileValue}>+55(11)95028-2051</Text>
                    </View>
                </View>

                <View style={[styles.header, { marginTop: 30 }]}>
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Dependents</Text>
                    </View>
                </View>

                <View style={styles.profile}>
                    <TouchableOpacity style={styles.icon} onPress={() => { }}>
                        <FontAwesome name={'pencil-square-o'} size={25} color={'#D3D3D3'}></FontAwesome>
                    </TouchableOpacity>
                    <View>
                        <View>
                            <Text style={[styles.profileProperty]}>NAME</Text>
                            <Text style={styles.profileValue}>Nickolas</Text>
                        </View>

                        <View>
                            <Text style={[styles.profileProperty]}>BIRTH</Text>
                            <Text style={styles.profileValue}>24/01/2000</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}