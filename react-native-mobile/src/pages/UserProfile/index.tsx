import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, ScrollView, Alert, FlatList } from 'react-native';
import styles from './styles';
import api from '../../services/api';

import { TabParamList } from '../../types';

type screenNavigationType = StackNavigationProp<TabParamList, 'Perfil'>
type profileScreenRouteType = RouteProp<TabParamList, 'Perfil'>

export default function UserProfile() {
    const { params } = useRoute<profileScreenRouteType>();
    const navigation = useNavigation<screenNavigationType>()

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [uf, setUf] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');

    const [dependents, setDependents] = useState([]);

    async function loadDonor() {
        try {
            const response = await api.get(`/donor/list/${params.id}`);

            const donor = response.data;

            setId(donor.id);
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

    useEffect(() => {
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

    function goToDonorEdit() {
        navigation.navigate('EditDonor', { id: params.id });
    }

    function goToDependent() {
        navigation.navigate('Dependent', { id: params.id, id_donor: id });
    }

    function goToEditDependent(dependent) {
        navigation.navigate('EditDependent', { id: params.id, id_donor: id, dependent });
    }

    let flag = false;

    let text = 'Carregando...';

    if (id) {
        flag = true;
    }

    async function loadDependents() {
        try {
            if (flag === true) {
                const response = await api.get(`/dependent/list/${id}`);

                setDependents(response.data);
                setIsRefreshing(false)
            }
        } catch (err) {
            console.log(err.response.data)
        }
    };

    useEffect(() => {
        loadDependents();
    }, [id]);


    const [isRefreshing, setIsRefreshing] = useState(false)

    const onRefresh = () => {
        //set isRefreshing to true
        setIsRefreshing(true);
        loadDonor();
        loadDependents();
        // and set isRefreshing to false at the end of your callApiMethod()
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewFlatList}>
                {!flag && <Text style={styles.textWaiting}>{text}</Text>}
                <FlatList
                    onRefresh={onRefresh}
                    refreshing={isRefreshing}
                    data={dependents}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={dependent => String(dependent.id)}
                    ListHeaderComponent={
                        <View>
                            <View style={styles.header}>
                                <View style={styles.viewtitle}>
                                    <Text style={styles.textTitle}>Doadora</Text>
                                </View>
                                <TouchableOpacity onPress={createTwoButtonAlert}>
                                    <MaterialIcons name={'logout'} size={25} color={'#414141'} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.profile}>
                                <TouchableOpacity style={styles.icon} onPress={goToDonorEdit}>
                                    <FontAwesome name={'pencil-square-o'} size={25} color={'#76BFAC'}></FontAwesome>
                                </TouchableOpacity>
                                <View>
                                    <View>
                                        <Text style={[styles.profileProperty]}>NOME</Text>
                                        <Text style={styles.profileValue}>{name}</Text>
                                    </View>

                                    <View>
                                        <Text style={[styles.profileProperty]}>DATA DE NASCIMENTO</Text>
                                        <Text style={styles.profileValue}>{new Date(birth).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</Text>
                                        {/* <Text style={styles.profileValue}>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(birth)}</Text> */}

                                    </View>
                                </View>

                                <View>
                                    <View>
                                        <Text style={styles.profileProperty}>ENDEREÇO</Text>
                                        <Text style={styles.profileValue}>{street}, {number} - {district}, {city} - {uf}, {zipCode}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={[styles.profileProperty]}>CONTATO</Text>
                                    <Text style={styles.profileValue}>{phone}</Text>
                                </View>
                            </View>

                            <View style={[styles.header, { marginTop: 30 }]}>
                                <View style={styles.viewtitle}>
                                    <Text style={styles.textTitle}>Dependentes</Text>
                                </View>
                                <TouchableOpacity onPress={goToDependent}>
                                    <Text style={styles.newButton}>Novo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    renderItem={({ item: dependent }) => (
                        <View>
                            {!flag && <Text style={styles.textWaiting}>{text}</Text>}
                            <View style={[styles.profile, { marginBottom: 20 }]}>
                                <TouchableOpacity style={styles.icon} onPress={() => goToEditDependent(dependent)}>
                                    <FontAwesome name={'pencil-square-o'} size={25} color={'#76BFAC'}></FontAwesome>
                                </TouchableOpacity>
                                <View>
                                    <View>
                                        <Text style={[styles.profileProperty]}>NOME</Text>
                                        <Text style={styles.profileValue}>{dependent.name}</Text>
                                    </View>

                                    <View>
                                        <Text style={[styles.profileProperty]}>DATA DE NASCIMENTO</Text>
                                        <Text style={styles.profileValue}>{new Date(dependent.birth).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}