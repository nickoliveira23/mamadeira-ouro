import React, { useState } from 'react';
import MaskInput from 'react-native-mask-input';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, RouteProp, useRoute, CommonActions } from '@react-navigation/native';
import styles from './styles'
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import api from '../../services/api';

import { StackParamList } from '../../types';

type screenNavigationType = StackNavigationProp<StackParamList, 'Dependent'>
type dependentScreenRouteType = RouteProp<StackParamList, 'Dependent'>

export default function Dependent() {
    const navigation = useNavigation<screenNavigationType>();

    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState(new Date());

    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { params } = useRoute<dependentScreenRouteType>();


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
            await api.post('/dependent/validate', {
                name: name,
                birth: date
            });

            const reponse = await api.post('/dependent/register', {
                name: name,
                birth: date,
                id_donor: params.id_donor
            });

            Alert.alert('Cadastro realizado com sucesso')

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: "Home",
                            state: {
                                routes: [
                                    {
                                        name: "Perfil",
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
                <Text style={styles.screenTitle}>Dependente</Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.saveButton}>Salvar</Text>
                </TouchableOpacity>
            </View>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
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
            </View>
            {/* </ScrollView> */}
        </View>
    );
}