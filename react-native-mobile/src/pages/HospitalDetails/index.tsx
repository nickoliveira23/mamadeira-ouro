import React, { useState, useEffect } from 'react';
import { Ionicons, AntDesign, Feather, Fontisto } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import styles from './styles';

import api from '../../services/api';

import AppointmentModal from '../../components/AppointmentModal'

import { StackParamList } from '../../types';

type screenNavigationType = StackNavigationProp<StackParamList, 'HospitalDetails'>
type hospitalDetailsScreenRouteType = RouteProp<StackParamList, 'HospitalDetails'>

export default function HospitalDetails() {
    const { params } = useRoute<hospitalDetailsScreenRouteType>();
    const navigation = useNavigation<screenNavigationType>()

    const [id, setId] = useState('');
    const [company, setCompany] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [uf, setUf] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');

    const [hospitalInfo, setHospitalInfo] = useState({});
    const [modalVisible, setModalVisible] = useState(false);



    useEffect(() => {
        async function LoadData() {

            const response = await api.get(`/hospital/availability/${params.hospital.id}`);

            // console.log(response.data)

            setId(params.hospital.id);
            setCompany(params.hospital.company);
            setCnpj(params.hospital.cnpj);
            setStreet(params.hospital.street);
            setNumber(params.hospital.number);
            setCity(params.hospital.city);
            setDistrict(params.hospital.district);
            setUf(params.hospital.uf);
            setZipCode(params.hospital.zipCode);
            setPhone(params.hospital.phone);

            setHospitalInfo({
                id: params.hospital.id,
                company: params.hospital.company,
                available: response.data.available
            })

            // console.log(JSON.stringify(hospitalInfo))
        }
        LoadData();
    }, []);

    function navigateBack() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <AntDesign style={styles.leftIcon} name='left' size={30} color='#414141' />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Detalhes</Text>
                <View style={styles.spaceView}></View>
            </View>
            <View style={styles.content}>

                <View style={styles.hospital}>
                    <View>
                        <View>
                            <Text style={[styles.profileProperty]}>NOME</Text>
                            <Text style={styles.profileValue}>{company}</Text>
                        </View>

                        <View>
                            <Text style={[styles.profileProperty]}>CNPJ</Text>
                            <Text style={styles.profileValue}>{cnpj}</Text>
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
                <View style={styles.viewButton}>
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                        <View style={styles.iconButton}>
                            <Fontisto name="date" size={20} color="#76BFAC" />
                        </View>
                        <View>
                            <Text style={styles.textButton}>Agendar avaliação de leite</Text>
                        </View>
                        <View style={styles.ArrowRightIcon}>
                            <Feather name="arrow-right" size={20} color="#76BFAC" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.viewButton, { borderBottomWidth: 1 }]}>
                    <TouchableOpacity style={styles.button}>
                        <View style={styles.iconButton}>
                            <Ionicons name="location-outline" size={20} color="#76BFAC" />
                        </View>
                        <View>
                            <Text style={styles.textButton}>Ver localização no mapa</Text>
                        </View>
                        <View style={styles.ArrowRightIcon}>
                            <Feather name="arrow-right" size={20} color="#76BFAC" />
                        </View>
                    </TouchableOpacity>
                </View>


                {/* <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View>
                                <Text style={styles.modalText}>Hello World!</Text>
                                <TouchableOpacity
                                    style={[styles.button2, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Hide Modal</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View> */}

                <AppointmentModal
                    show={modalVisible}
                    setShow={setModalVisible}
                    hospital={hospitalInfo}
                />

            </View>
        </View >
    )
}