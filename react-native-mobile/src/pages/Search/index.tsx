import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from "expo-location";
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons'
import { Alert, Text, Modal, TouchableOpacity, View, FlatList, StyleSheet, Pressable, } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import styles from "./styles";

import { TabParamList } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';

type screenNavigationType = StackNavigationProp<TabParamList, 'Buscar'>
type searchScreenRouteType = RouteProp<TabParamList, 'Buscar'>

export default function Search() {
    const [hospitals, setHospitals] = useState([]);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const navigation = useNavigation<screenNavigationType>();
    const { params } = useRoute<searchScreenRouteType>();

    async function navigateBack() {
        navigation.goBack()
    }

    async function getCurrentPosition() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});

        setLocation(currentLocation);
    };

    useEffect(() => {
        getCurrentPosition();
    }, []);

    let flag = false;

    let text = 'Carregando...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        // text = JSON.stringify(location);
        flag = true;
    }

    async function loadData() {
        try {
            if (flag === true) {
                const response = await api.get('/hospital/list', {
                    headers: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }
                });

                setHospitals(response.data);
                setIsRefreshing(false)
            }
        } catch (err) {
            Alert.alert('Algo deu errado!')
        }
    };

    useEffect(() => {
        loadData();
    }, [location]);

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
                    text: "Cancelar",
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

    const [isRefreshing, setIsRefreshing] = useState(false)

    const onRefresh = () => {
        //set isRefreshing to true
        setIsRefreshing(true);
        getCurrentPosition();
        loadData();
        // and set isRefreshing to false at the end of your callApiMethod()
    }

    function goToHospitalDetails(hospital) {
        navigation.navigate('HospitalDetails', { hospital })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>Bancos de leite próximos</Text>
                </View>
                <TouchableOpacity style={styles.logoutIcon} onPress={createTwoButtonAlert}>
                    <MaterialIcons name={'logout'} size={25} color={'#414141'} />
                </TouchableOpacity>
            </View>
            <View style={styles.viewButtonSaved}>
                <TouchableOpacity style={styles.buttonSaved}>
                    <View style={styles.bookmarkIcon}>
                        <Ionicons name="star" size={20} color="#76BFAC" />
                    </View>
                    <View>
                        <Text style={styles.textSaved}>Mostrar hospitais salvos</Text>
                    </View>
                    <View style={styles.ArrowRightIcon}>
                        <Feather name="arrow-right" size={20} color="#76BFAC" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.viewFlatList}>
                {!flag && <Text style={styles.textWaiting}>{text}</Text>}
                <FlatList
                    onRefresh={onRefresh}
                    refreshing={isRefreshing}
                    data={hospitals}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={hospital => String(hospital.id)}

                    renderItem={({ item: hospital }) => (
                        <View style={styles.hospitals}>
                            <View>
                                <Text style={styles.hospitalProperty}>NOME</Text>
                                <Text style={styles.hospitalValue}>{hospital.company}</Text>
                            </View>
                            <View>
                                <Text style={styles.hospitalProperty}>ENDEREÇO</Text>
                                <Text style={styles.hospitalValue}>
                                    {hospital.street}, {hospital.number} - {hospital.district}, {hospital.city} - {hospital.uf}, {hospital.zipCode}
                                </Text>
                            </View>
                            <View style={styles.button}>
                                <TouchableOpacity onPress={() => goToHospitalDetails(hospital)}>
                                    <Text style={styles.buttonText}>Detalhes...</Text>
                                </TouchableOpacity>
                                <View>
                                    <Feather name="arrow-right" color="#76BFAC" size={20} onPress={() => goToHospitalDetails(hospital)} />
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

  