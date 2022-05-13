import React, { useEffect, useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, RouteProp, useRoute, CommonActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles'
import { StackNavigationProp } from '@react-navigation/stack';
import api from '../../services/api';

import { StackParamList } from '../../types';

type screenNavigationType = StackNavigationProp<StackParamList, 'EditDependent'>
type editDependentScreenRouteType = RouteProp<StackParamList, 'EditDependent'>

export default function EditDonor() {

    const { params } = useRoute<editDependentScreenRouteType>();

    const navigation = useNavigation<screenNavigationType>();

    const [isPickerShow, setIsPickerShow] = useState(false);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function LoadData() {
            setId(params.dependent.id);
            setName(params.dependent.name);
            setBirth(params.dependent.birth);
        }
        LoadData();
    }, []);

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
            const validation = await api.post('/dependent/validate', {
                name: name,
                birth: birth,
            });

            await api.put(`/dependent/update/${id}`, {
                name: name,
                birth: birth,
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
    function navigateBack() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign
                    style={styles.leftIcon}
                    name='left'
                    size={25}
                    color='#414141'
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.screenTitle}>Editar Informações</Text>
                <TouchableOpacity onPress={handleUpdate}>
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
                            {new Date(birth).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
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
                {/* </ScrollView> */}
            </View>
        </View>
    );
}