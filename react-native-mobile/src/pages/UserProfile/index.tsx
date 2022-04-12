import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from './styles';
import api from '../../services/api';

import { TabParamList } from '../../types';

type screenNavigationType = StackNavigationProp<TabParamList, 'Profile'>
type profileScreenRouteType = RouteProp<TabParamList, 'Profile'>

export default function UserProfile() {
    const { params } = useRoute<profileScreenRouteType>();
    const navigation = useNavigation<screenNavigationType>()

    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [uf, setUf] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        async function loadDonor() {
            try {
                const response = await api.get(`/donor/${params.id}`);

                const donor = response.data;

                setName(donor.name);
                setBirth(donor.birth);
                setStreet(donor.street);
                setNumber(JSON.stringify(donor.number));
                setCity(donor.city);
                setDistrict(donor.district);
                setUf(donor.uf);
                setZipCode(donor.zipCode);
                setPhone(donor.phone);
            } catch (err) {
                console.log(err.response.data)
            }
        }
        loadDonor();
    }, [params.id]);

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

    function goToDonorEdit() {
        navigation.navigate('EditDonor', { id: params.id });
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.viewtitle}>
                        <Text style={styles.textTitle}>Profile</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.logoutIcon} onPress={createTwoButtonAlert}>
                            <MaterialIcons name={'logout'} size={25} color={'#808080'}></MaterialIcons>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.profile}>
                    <TouchableOpacity style={styles.icon} onPress={goToDonorEdit}>
                        <FontAwesome name={'pencil-square-o'} size={25} color={'#D3D3D3'}></FontAwesome>
                    </TouchableOpacity>
                    <View>
                        <View>
                            <Text style={[styles.profileProperty]}>NAME</Text>
                            <Text style={styles.profileValue}>{name}</Text>
                        </View>

                        <View>
                            <Text style={[styles.profileProperty]}>BIRTH</Text>
                            <Text style={styles.profileValue}>{new Date(birth).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</Text>
                            {/* <Text style={styles.profileValue}>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(birth)}</Text> */}

                        </View>
                    </View>

                    <View>
                        <View>
                            <Text style={styles.profileProperty}>ADDRESS</Text>
                            <Text style={styles.profileValue}>{street}, {number} - {district}, {city} - {uf}, {zipCode}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.profileProperty]}>CONTACT</Text>
                        <Text style={styles.profileValue}>{phone}</Text>
                    </View>
                </View>

                <View style={[styles.header, { marginTop: 30 }]}>
                    <View style={styles.viewtitle}>
                        <Text style={styles.textTitle}>Dependents</Text>
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