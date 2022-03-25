import React, { useState } from 'react';
import MaskInput from 'react-native-mask-input';
import DatePicker from 'react-native-date-picker'
import { View, Text, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';
import api from '../../services/api';

import { StackParamList } from '../../types';

type screenNavigationType = StackNavigationProp<StackParamList, 'Register'>
type passwordScreenRouteType = RouteProp<StackParamList, 'Register'>

export default function Register() {
    const navigation = useNavigation<screenNavigationType>();

    // const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false)

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

    const { params } = useRoute<passwordScreenRouteType>();


    // const showPicker = () => {
    //     setIsPickerShow(true);
    // };

    const onChange = (value) => {
        setOpen(false)
        setDate(value);
        // if (Platform.OS === 'android') {
        //     setIsPickerShow(false);
        // }
        // console.log(date)
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
                birth: birth,
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
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <View style={{ flex: 1, alignItems: 'center' }}></View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'center' }}>Editar Informações</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleRegister}>
                        <Text style={{ color: '#ff8c00ad', top: 10, left: 20, fontSize: 15 }}>Concluido</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={{ borderBottomColor: '#CCCCCC', borderBottomWidth: 1, borderTopWidth: 1, borderTopColor: '#CCCCCC', paddingHorizontal: 15, paddingVertical: 15, backgroundColor: '#FFFFFF' }}>
                    {!!errorMessage && <Text style={{ color: '#FF0000', marginBottom: 20, textAlign: 'center' }}>{errorMessage} </Text>}
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 15 }}>
                        <Text style={styles.titulos}>   NOME*</Text>
                        <TextInput keyboardType='default' multiline={false} clearButtonMode='always' maxLength={25} style={styles.textInput} placeholder='Adicione o nome' value={name} onChangeText={name => setName(name)} />
                    </View>
                    <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.titulos}>   DATA DE NASCIMENTO*</Text>
                        </View>
                        {/* <View>
                            <Text>{date.toISOString().split('T')[0]}</Text>
                        </View> */}
                        {/* {!isPickerShow && (
                            <View>
                                <Button title="Show Picker" color="purple" onPress={showPicker} />
                            </View>
                        )} */}
                        {/* {isPickerShow && ( */}
                        <Button title="Open" onPress={() => setOpen(true)} />
                        <DatePicker modal open={open} date={date} onConfirm={onChange} onCancel={() => { setOpen(false) }} />
                        {/* )} */}
                    </View>
                    <View style={styles.location}>
                        <View style={{ flex: 1, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0, 0.05)', paddingBottom: 15 }}>
                            <Text style={styles.titulos}>   RUA</Text>
                            <TextInput placeholderTextColor='rgba(0,0,0, 0.50)' placeholder='Adicionar rua' clearButtonMode='always' multiline={false} maxLength={100} style={styles.textInput} value={street} onChangeText={street => setStreet(street)} />
                        </View>
                        <View style={{ width: 100, marginLeft: 20, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0, 0.05)', paddingBottom: 15 }}>
                            <Text style={styles.titulos}>   NÚMERO</Text>
                            <TextInput keyboardType='numeric' clearButtonMode='always' maxLength={4} style={styles.textInput} placeholder='Num' value={number} onChangeText={number => setNumber(number)} />
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 15 }}>
                        <Text style={styles.titulos}>   BAIRRO*</Text>
                        <TextInput keyboardType='default' multiline={false} clearButtonMode='always' maxLength={25} style={styles.textInput} placeholder='Adicione o bairro' value={district} onChangeText={district => setDistrict(district)} />
                    </View>
                    <View style={styles.location}>
                        <View style={{ flex: 1, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0, 0.05)', paddingBottom: 15 }}>
                            <Text style={styles.titulos}>   CIDADE</Text>
                            <TextInput placeholderTextColor='rgba(0,0,0, 0.50)' placeholder='Adicionar Cidade' clearButtonMode='always' multiline={false} maxLength={100} style={styles.textInput} value={city} onChangeText={city => setCity(city)} />
                        </View>
                        <View style={{ width: 60, marginLeft: 20, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0, 0.05)', paddingBottom: 15 }}>
                            <Text style={styles.titulos}>   UF</Text>
                            <TextInput autoCapitalize='characters' placeholderTextColor='rgba(0,0,0, 0.50)' placeholder='UF' clearButtonMode='always' multiline={false} maxLength={2} style={styles.textInput} value={uf} onChangeText={uf => setUf(uf)} />
                        </View>
                    </View>

                    <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.titulos}>   CEP*</Text>
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
                            <Text style={styles.titulos}>   CELULAR*</Text>
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