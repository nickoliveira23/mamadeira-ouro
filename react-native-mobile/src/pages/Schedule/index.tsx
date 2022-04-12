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

type screenNavigationType = StackNavigationProp<TabParamList, 'Schedule'>
type searchScreenRouteType = RouteProp<TabParamList, 'Schedule'>

export default function Schedule() {
    const [schedule, setSchedule] = useState([]);

    const navigation = useNavigation<screenNavigationType>();
    const { params } = useRoute<searchScreenRouteType>();

    async function navigateBack() {
        navigation.goBack()
    }


    // async function loadData() {
    //     try {
    //         const response = await api.get(`/schedules/list/${params.id}`, {
    //             headers: {

    //             }
    //         });

    //         setSchedules(response.data);
    //     } catch (err) {
    //         Alert.alert('Algo deu errado!')
    //     }
    // };

    // useEffect(() => {
    //     loadData();
    // }, []);

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
                    <Text style={styles.textTitle}>Schedule</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.logoutIcon} onPress={createTwoButtonAlert}>
                        <MaterialIcons name={'logout'} size={25} color={'#808080'}></MaterialIcons>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.viewFlatList}>
                {/* <FlatList
                    data={schedule}
                    keyExtractor={commitment => String(commitment.id)}
                    renderItem={({ item: commitment }) => ( */}
                        <View style={styles.schedule}>
                            <View>
                                <Text style={styles.hospitalProperty}>PLACE</Text>
                                {/* <Text style={styles.hospitalValue}>{commitment.company}</Text> */}
                                <Text style={styles.hospitalValue}>Hospital Ipiranga - Mogi das Cruzes</Text>
                            </View>
                            <View>
                                <Text style={styles.hospitalProperty}>ADDRESS</Text>
                                {/* <Text style={styles.hospitalValue}>{commitment.phone}</Text> */}
                                <Text style={styles.hospitalValue}>R. Ipiranga, 797 - Jardim Santista, Mogi das Cruzes - SP, 08730-000</Text>
                            </View>
                            <View>
                                <Text style={styles.hospitalProperty}>DATE/HOUR</Text>
                                {/* <Text style={styles.hospitalValue}>{commitment.date}</Text> */}
                                <Text style={styles.hospitalValue}>11/04/2022 - 14:00</Text>
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
                    {/* )}
                /> */}
            </View>
        </View>
    );
}