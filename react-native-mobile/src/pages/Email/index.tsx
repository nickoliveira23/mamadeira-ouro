import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Ionicons } from '@expo/vector-icons';
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
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      if (Platform.OS === 'android') {
        await AsyncStorage.clear();
      }
      if (Platform.OS === 'ios') {
        await AsyncStorage.multiRemove(asyncStorageKeys);
      }
    }
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
      <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
        <View style={styles.area1}>
          <AntDesign name='left' size={30} style={{ alignSelf: 'flex-start' }} color='rgba(0,0,0, 0.75)' onPress={navigateBack} />
          <Text style={styles.txtNumero}>E-mail</Text>
        </View>
        <View style={{ marginTop: 0, height: 50, width: 300, borderWidth: 1, borderRadius: 10, borderColor: 'rgb(195,195,197)', flexDirection: 'row', padding: 10, paddingRight: 50 }}>
          <Ionicons name="md-person" size={24} color="rgba(0,0,0, 0.75)" style={{ marginRight: 0 }} />
          <View style={{ alignItems: "center", justifyContent: "center", paddingLeft: 10 }}>
            <TextInput autoCapitalize="none" autoCorrect={false} style={{ fontSize: 13 }} value={email} onChangeText={email => setEmail(email)} placeholder='E-mail                                                 ' />
          </View>
        </View>
        <View style={styles.area2}>
          {!!errorMessage && <Text style={{ color: '#FF0000', marginBottom: 20 }}>{errorMessage} </Text>}
          <TouchableOpacity onPress={handleEmail} style={[styles.botao, { borderColor: '#707070', backgroundColor: null, marginBottom: 50 }]}>
            <Text style={{ color: '#707070' }}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}