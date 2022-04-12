import React, { useEffect, useState } from 'react';
import MaskInput from 'react-native-mask-input';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, RouteProp, useRoute, CommonActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';
import api from '../../services/api';

import { StackParamList } from '../../types';

type screenNavigationType = StackNavigationProp<StackParamList, 'EditDonor'>
type userProfileScreenRouteType = RouteProp<StackParamList, 'EditDonor'>

export default function EditDonor() {
    const navigation = useNavigation<screenNavigationType>();

    const [isPickerShow, setIsPickerShow] = useState(false);

    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [uf, setUf] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function LoadData() {

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
        }
        LoadData();
    }, []);

    const { params } = useRoute<userProfileScreenRouteType>();


    const showDatePicker = () => {
        setIsPickerShow(true);
    };

    const hideDatePicker = () => {
        setIsPickerShow(false);
    };

    const handleConfirm = (date) => {
        // const dataFormatada = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        setBirth(date);
        hideDatePicker();
    };

    async function handleUpdate() {
        try {
            const validation = await api.post('/donor/validate', {
                name: name,
                birth: birth,
                street: street,
                number: number,
                city: city,
                district: district,
                uf: uf,
                zipCode: zipCode,
                phone: phone,
            });

            await api.put(`donor/update/${params.id}`, {
                name: name,
                birth: birth,
                street: street,
                number: number,
                city: city,
                district: district,
                uf: uf,
                zipCode: zipCode,
                phone: phone,
            });

            Alert.alert(validation.data.message)

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: "Home",
                            state: {
                                routes: [
                                    {
                                        name: "Profile",
                                        params: { id: params.id }
                                    }
                                ]
                            }
                        }
                    ]
                })
            );
        } catch (err) {
            setErrorMessage(err.response.data.error);
            Alert.alert(err.response.data.error);
        }
    }
    function navigateBack() {
        navigation.goBack()
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign style={styles.leftIcon}name='left' size={25}  color='rgba(0,0,0, 0.75)' onPress={navigateBack} />
                <View>
                    <Text style={styles.screenTitle}>         Editar Informações</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={handleUpdate}>
                        <Text style={styles.saveButton}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={{ borderBottomColor: '#CCCCCC', borderBottomWidth: 1, borderTopWidth: 1, borderTopColor: '#CCCCCC', paddingHorizontal: 15, paddingVertical: 15, backgroundColor: '#FFFFFF' }}>
                    {!!errorMessage && <Text style={{ color: '#FF0000', marginBottom: 20, textAlign: 'center' }}>{errorMessage} </Text>}
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 15 }}>
                        <Text style={styles.label}>   NOME*</Text>
                        <TextInput keyboardType='default' multiline={false} clearButtonMode='always' maxLength={25} style={styles.textInput} placeholder='Adicione o nome' value={name} onChangeText={name => setName(name)} />
                    </View>
                    <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.label}>   DATA DE NASCIMENTO*</Text>
                        </View>
                        {/* <View>
                            <Text>{date.toISOString().split('T')[0]}</Text>
                        </View> */}
                        <View style={styles.textInput}>
                            <Text style={{ marginTop: 10, fontWeight: '200' }} onPress={showDatePicker}>{new Date(birth).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</Text>
                        </View>
                        {isPickerShow && (
                            <DateTimePickerModal
                                isVisible={isPickerShow}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        )}
                    </View>
                    <View style={styles.location}>
                        <View style={{ flex: 1, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0, 0.05)', paddingBottom: 15 }}>
                            <Text style={styles.label}>   RUA</Text>
                            <TextInput placeholderTextColor='rgba(0,0,0, 0.50)' placeholder='Adicionar rua' clearButtonMode='always' multiline={false} maxLength={100} style={styles.textInput} value={street} onChangeText={street => setStreet(street)} />
                        </View>
                        <View style={{ width: 100, marginLeft: 20, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0, 0.05)', paddingBottom: 15 }}>
                            <Text style={styles.label}>   NÚMERO</Text>
                            <TextInput keyboardType='numeric' clearButtonMode='always' maxLength={4} style={styles.textInput} placeholder='Num' value={number} onChangeText={number => setNumber(number)} />
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 15 }}>
                        <Text style={styles.label}>   BAIRRO*</Text>
                        <TextInput keyboardType='default' multiline={false} clearButtonMode='always' maxLength={25} style={styles.textInput} placeholder='Adicione o bairro' value={district} onChangeText={district => setDistrict(district)} />
                    </View>
                    <View style={styles.location}>
                        <View style={{ flex: 1, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0, 0.05)', paddingBottom: 15 }}>
                            <Text style={styles.label}>   CIDADE</Text>
                            <TextInput placeholderTextColor='rgba(0,0,0, 0.50)' placeholder='Adicionar Cidade' clearButtonMode='always' multiline={false} maxLength={100} style={styles.textInput} value={city} onChangeText={city => setCity(city)} />
                        </View>
                        <View style={{ width: 60, marginLeft: 20, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0, 0.05)', paddingBottom: 15 }}>
                            <Text style={styles.label}>   UF</Text>
                            <TextInput autoCapitalize='characters' placeholderTextColor='rgba(0,0,0, 0.50)' placeholder='UF' clearButtonMode='always' multiline={false} maxLength={2} style={styles.textInput} value={uf} onChangeText={uf => setUf(uf)} />
                        </View>
                    </View>

                    <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.label}>   CEP*</Text>
                        </View>
                        <MaskInput
                            placeholder='Adicione seu CEP'
                            keyboardType='numeric'
                            style={styles.textInput}
                            clearButtonMode='always'
                            value={zipCode}
                            onChangeText={(masked, unmasked) => {
                                setZipCode(unmasked); // you can use the unmasked value as well 
                            }}
                            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                        />
                    </View>
                    <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.label}>   CELULAR*</Text>
                        </View>
                        <MaskInput
                            placeholder='Adicione seu número de celular'
                            keyboardType='numeric'
                            style={styles.textInput}
                            clearButtonMode='always'
                            value={phone}
                            onChangeText={(masked, unmasked) => {
                                setPhone(unmasked); // you can use the unmasked value as well 
                            }}
                            mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );

}