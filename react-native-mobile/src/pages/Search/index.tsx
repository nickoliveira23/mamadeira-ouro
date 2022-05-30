import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View, FlatList } from "react-native";
import { CommonActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Feather } from '@expo/vector-icons'
import * as Location from "expo-location";
import { StackNavigationProp } from '@react-navigation/stack';
import styles from "./styles";

import api from '../../services/api';

//Importando o type referente a essa tela
import { TabParamList } from '../../types';

/*Aqui é criado um type para que ao navegar entre telas seja possível passar 
parâmetros definidos no StackParamList onde foi declarado quais parametros 
cada tela recebe*/
type screenNavigationType = StackNavigationProp<TabParamList, 'Buscar'>
type searchScreenRouteType = RouteProp<TabParamList, 'Buscar'>

export default function Search() {
    const navigation = useNavigation<screenNavigationType>();
    const route = useRoute<searchScreenRouteType>();

    const { params } = route;

    const controller = new AbortController;
    const signal = controller.signal;

    const [hospitals, setHospitals] = useState([]);
    const [location, setLocation] = useState<any>();
    const [errorMsg, setErrorMsg] = useState('');

    async function getCurrentPosition() {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permissão para acessar local negada!');
            return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});

        setLocation(currentLocation);
    }

    useEffect(() => {
        getCurrentPosition()
    }, []);

    async function loadData(signal: any) {
        try {
            if (flag === true) {
                const response = await api.get('/hospital/list', {
                    signal,
                    headers: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }
                });
                setHospitals(response.data);
                setIsRefreshing(false)
            }
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        loadData(signal);
        return () => controller.abort();
    }, [location]);

    async function handleLogout() {
        await AsyncStorage.clear();

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Index', }
                ]

            })
        )
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
        loadData(signal);
        // and set isRefreshing to false at the end of your callApiMethod()
    }

    const goToHospitalDetails = (hospital: any) => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'HospitalDetails',
                params: {
                    hospital: hospital,
                    id_user: params.id
                }
            })
        )
    }

    let flag = false;

    let text = 'Carregando...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        flag = true;
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
            {/* <View style={styles.viewButtonSaved}>
                <TouchableOpacity style={styles.buttonSaved}>
                    <View style={styles.bookmarkIcon}>
                        <Ionicons name="star" size={20} color="#A1E1D8" />
                    </View>
                    <View>
                        <Text style={styles.textSaved}>Mostrar hospitais salvos</Text>
                    </View>
                    <View style={styles.ArrowRightIcon}>
                        <Feather name="arrow-right" size={20} color="#A1E1D8" />
                    </View>
                </TouchableOpacity>
            </View> */}
            <View style={styles.viewFlatList}>
                {!flag && <Text style={styles.textWaiting}>{text}</Text>}
                <FlatList
                    onRefresh={onRefresh}
                    refreshing={isRefreshing}
                    data={hospitals}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(hospital: any) => String(hospital.id)}
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
                                    <Feather name="arrow-right" color="#A1E1D8" size={20} onPress={() => goToHospitalDetails(hospital)} />
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

