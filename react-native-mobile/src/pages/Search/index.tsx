import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from "expo-location";
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { Alert, Text, TouchableOpacity, View, FlatList, } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import styles from "./styles";

import { TabParamList } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';

type screenNavigationType = StackNavigationProp<TabParamList, 'Search'>
type searchScreenRouteType = RouteProp<TabParamList, 'Search'>

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
        let location = await Location.getCurrentPositionAsync({});

        setLocation(location);
    };

    useEffect(() => {
        getCurrentPosition();
    }, []);

    let flag = false;

    let text = 'Waiting..';
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
            <View style={styles.header}>
                <View style={styles.viewTitle}>
                    <Text style={styles.textTitle}>Milk Bank</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.logoutIcon} onPress={createTwoButtonAlert}>
                        <MaterialIcons name={'logout'} size={25} color={'#808080'}></MaterialIcons>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.viewFlatList}>
                {!flag && <Text style={styles.textWaiting}>{text}</Text>}
                <FlatList
                    data={hospitals}
                    keyExtractor={hospital => String(hospital.id)}
                    renderItem={({ item: hospital }) => (
                        <View style={styles.hospitals}>
                            <View>
                                <Text style={styles.hospitalProperty}>NAME</Text>
                                <Text style={styles.hospitalValue}>{hospital.company}</Text>
                            </View>
                            <View>
                                <Text style={styles.hospitalProperty}>CONTACT</Text>
                                <Text style={styles.hospitalValue}>{hospital.phone}</Text>
                            </View>
                            <View style={styles.button}>
                                <TouchableOpacity onPress={() => { }}>
                                    <Text style={styles.buttonText}>See more...</Text>

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { }}>
                                    <Feather name="arrow-right" color="#FF0000" size={20} onPress={() => { }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}