import React, { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles';
import api from '../../services/api';

import { StackParamList } from '../../types';

type screenNavigationType = StackNavigationProp<StackParamList, 'Password'>
type passwordScreenRouteType = RouteProp<StackParamList, 'Password'>

export default function Password() {

    const navigation = useNavigation<screenNavigationType>();
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const { params } = useRoute<passwordScreenRouteType>();

    async function navigateBack() {
        navigation.goBack()
    }

    async function handlePassword() {
        try {
            const response = await api.post('/user/password', {
                // password: "123Teste456!",
                password: password,
            });

            const register = await api.post('/user/register', {
                email: params.user,
                // password: "123Teste456!",
                password: password,
                type: 'donor'
            });

            const { id } = register.data

            navigation.reset({
                index: 0,
                routes: [{ name: 'Register', params: { id: id } }],
            });
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
                    <Text style={styles.title}>Senha</Text>
                </View>
                <View style={styles.passwordInputView}>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={password}
                        onChangeText={password => setPassword(password)}
                        placeholder='Defina uma senha'
                        placeholderTextColor='#C3C3C5'
                        style={styles.passwordInput}
                    >
                    </TextInput>
                </View>
                <Text style={styles.rememberText}>Lembre-se, não informe sua senha para ninguém!</Text>
                {!!errorMessage && <Text style={styles.errorMessage}>{errorMessage} </Text>}
                <View style={styles.viewButton}>
                    <TouchableOpacity style={styles.button} onPress={handlePassword}>
                        <Text>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}




