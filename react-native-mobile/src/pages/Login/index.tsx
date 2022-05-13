import React, { useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Fontisto, AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles';

import api from '../../services/api';

import { StackParamList } from '../../types'

type screenNavigationType = StackNavigationProp<StackParamList, 'Login'>

export default function Login() {
    const navigation = useNavigation<screenNavigationType>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);

    async function signIn() {
        try {
            const response = await api.post('/session', {
                email: 'b@b.com',
                password: '123Teste456!',
                // email: email,
                // password: password,
                type: "donor"
            });

            const { user, token, message } = response.data;

            await AsyncStorage.multiSet([
                ['@CodeApi:user', JSON.stringify(user)],
                ['@CodeApi:token', token],
            ]);

            setLoggedInUser(user);

            Alert.alert(message);

            const idObj = JSON.stringify(user);
            const { id } = JSON.parse(idObj);

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
                                        params: { id: id }
                                    },
                                    {
                                        name: "Buscar",
                                        params: { id: id }
                                    },
                                    {
                                        name: "Agenda",
                                        params: { id: id }
                                    }
                                ]
                            }
                        }
                    ]
                })
            );
        } catch (err) {
            console.log(err)
            setErrorMessage(err.response.data.error);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                <AntDesign style={styles.leftIcon} name='left' size={30} color='#414141' />
            </TouchableOpacity>
            <View style={styles.content}>
                <View style={styles.viewTitle}>
                    <Text style={styles.title}>Entrar</Text>
                </View>
                <View style={styles.inputViews}>
                    <View style={styles.inputTextView}>
                        <Ionicons name="md-person" size={24} color="#414141" />
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.inputText}
                            value={email}
                            onChangeText={email => setEmail(email)}
                            placeholderTextColor="#C3C3C5"
                            placeholder='E-mail'
                        />
                    </View>
                    <View style={styles.inputTextView}>
                        <Fontisto name="locked" size={24} color="#414141" />
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            style={styles.inputText}
                            value={password}
                            onChangeText={password => setPassword(password)}
                            placeholderTextColor="#C3C3C5"
                            placeholder='Senha'
                        />
                    </View>
                </View>
                <Text style={styles.rememberText}>Lembre-se, não compartilhe sua senha com ninguém!</Text>
                {!!errorMessage && <Text style={styles.errorMessage}>{errorMessage} </Text>}
                <View style={styles.viewButton}>
                    <TouchableOpacity onPress={signIn} style={styles.button}>
                        <Text>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

