import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../Index/styles';

export default function Index() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.infoView}>
                {/* <Image source={require('../../assets/Logo.png')} style={styles.logo} /> */}
                <View  style={styles.logo} />
                <Text style={styles.termsText}>
                    Ao tocar em Criar conta ou Entrar, você concorda com
                    nossos termos. Saiba como tratamos os seus dados em
                    nossa Política de Privacidade e Política de Cookies.
                </Text>
            </View>
            <View style={styles.buttonsView}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Email')}>
                    <Text style={styles.buttonText}>CRIAR CONTA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonLogin]} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText2}>ENTRAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}