import React, { useState } from 'react';
import MaskInput from 'react-native-mask-input';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import styles from './styles'
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import api from '../../services/api';

import { StackParamList } from '../../types';

type screenNavigationType = StackNavigationProp<StackParamList, 'Register'>
type registerScreenRouteType = RouteProp<StackParamList, 'Register'>

export default function Register() {
    const navigation = useNavigation<screenNavigationType>();

    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState(new Date());

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

    const { params } = useRoute<registerScreenRouteType>();


    const showDatePicker = () => {
        setIsPickerShow(true);
    };

    const hideDatePicker = () => {
        setIsPickerShow(false);
    };

    const handleConfirm = (date) => {
        // const dataFormatada = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        setDate(date);
        hideDatePicker();
    };

    async function handleRegister() {
        try {
            await api.post('/donor/validate', {
                name: name,
                birth: date,
                street: street,
                number: number,
                city: city,
                district: district,
                uf: uf,
                zipCode: zipCode,
                phone: phone,
            });

            const response = await api.post('/donor/register', {
                name: name,
                birth: date,
                street: street,
                number: number,
                city: city,
                district: district,
                uf: uf,
                zipCode: zipCode,
                phone: phone,
                id_user: params.id
            });

            Alert.alert('Cadastro realizado com sucesso')

            navigation.reset({
                index: 0,
                routes: [{ name: 'Index' }],
            });
        } catch (err) {
            setErrorMessage(err.response.data.error);
            Alert.alert(err.response.data.error);
        }

    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign
                    style={styles.leftIcon}
                    name='left'
                    size={25}
                    color='#414141'
                    onPress={() => { }}
                />
                <Text style={styles.screenTitle}>Editar Informações</Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.saveButton}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {!!errorMessage && <Text style={styles.errorMessage}>{errorMessage} </Text>}
                    <View style={styles.viewInput}>
                        <Text style={styles.titles}>NOME*</Text>
                        <TextInput
                            style={styles.textInput}
                            keyboardType='default'
                            multiline={false}
                            clearButtonMode='always'
                            maxLength={25}
                            placeholder='Adicione o nome'
                            placeholderTextColor="#C3C3C5"
                            value={name}
                            onChangeText={name => setName(name)}
                        />
                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.titles}>DATA DE NASCIMENTO*</Text>
                        <View style={styles.textInput}>
                            <Text style={{ marginTop: 10, fontWeight: '200' }} onPress={showDatePicker}>
                                {date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                            </Text>
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
                        <View style={styles.viewColOne}>
                            <Text style={styles.titles}>RUA</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor='#C3C3C5'
                                placeholder='Adicionar rua'
                                clearButtonMode='always'
                                multiline={false}
                                maxLength={100}
                                value={street}
                                onChangeText={street => setStreet(street)}
                            />
                        </View>
                        <View style={styles.viewColTwo}>
                            <Text style={styles.titles}>NÚMERO</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor='#C3C3C5'
                                placeholder='227'
                                keyboardType='numeric'
                                clearButtonMode='always'
                                maxLength={4}
                                value={number}
                                onChangeText={number => setNumber(number)}
                            />
                        </View>
                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.titles}>BAIRRO*</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#C3C3C5'
                            placeholder='Adicione o bairro'
                            keyboardType='default'
                            multiline={false}
                            clearButtonMode='always'
                            maxLength={25}
                            value={district}
                            onChangeText={district => setDistrict(district)}
                        />
                    </View>
                    <View style={styles.location}>
                        <View style={styles.viewColOne}>
                            <Text style={styles.titles}>CIDADE</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor='#C3C3C5'
                                placeholder='Adicionar Cidade'
                                clearButtonMode='always'
                                multiline={false}
                                maxLength={100}
                                value={city}
                                onChangeText={city => setCity(city)}
                            />
                        </View>
                        <View style={styles.viewColTwo}>
                            <Text style={styles.titles}>UF</Text>
                            <TextInput
                                autoCapitalize='characters'
                                style={styles.textInput}
                                placeholderTextColor='#C3C3C5'
                                placeholder='UF'
                                clearButtonMode='always'
                                multiline={false}
                                maxLength={2}
                                value={uf}
                                onChangeText={uf => setUf(uf)}
                            />
                        </View>
                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.titles}>CEP*</Text>
                        <MaskInput
                            style={styles.textInput}
                            placeholderTextColor='#C3C3C5'
                            placeholder='Adicione seu CEP'
                            keyboardType='numeric'
                            clearButtonMode='always'
                            value={zipCode}
                            onChangeText={(masked, unmasked) => {
                                setZipCode(unmasked); // you can use the unmasked value as well 
                            }}
                            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                        />
                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.titles}>CELULAR*</Text>
                        <MaskInput
                            style={styles.textInput}
                            placeholderTextColor='#C3C3C5'
                            placeholder='Adicione seu número de celular'
                            keyboardType='numeric'
                            clearButtonMode='always'
                            value={phone}
                            onChangeText={(masked, unmasked) => {
                                setPhone(unmasked); // you can use the unmasked value as well 
                            }}
                            mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}