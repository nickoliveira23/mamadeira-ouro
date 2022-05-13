import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles'
import api from '../../services/api';

import { StackParamList } from '../../types'

type screenNavigationType = StackNavigationProp<StackParamList, 'Email'>

export default function Email() {

    const navigation = useNavigation<screenNavigationType>();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    async function navigateBack() {
        navigation.goBack()
    }

    async function handleEmail() {
        try {
            const response = await api.post('/user/email', {
                email: email
            });

            const user = response.data.email;

            navigation.navigate('Password', { user });
        } catch (err) {
            setErrorMessage(err.response.data.error);
            Alert.alert(err.response.data.error);
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={navigateBack}>
                <AntDesign style={styles.leftIcon} name='left' size={30} color='#414141' />
            </TouchableOpacity>
            <View style={styles.content}>
                <View style={styles.viewTitle}>
                    <Text style={styles.title}>E-mail</Text>
                </View>
                <View style={styles.emailInputView}>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={email => setEmail(email)}
                        placeholder='Informe seu endereço de e-mail'
                        placeholderTextColor='#C3C3C5'
                        style={styles.emailInput}
                    >
                    </TextInput>
                </View>
                {!!errorMessage && <Text style={styles.errorMessage}>{errorMessage} </Text>}
                <View style={styles.viewButton}>
                    <TouchableOpacity style={styles.button} onPress={handleEmail}>
                        <Text>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}