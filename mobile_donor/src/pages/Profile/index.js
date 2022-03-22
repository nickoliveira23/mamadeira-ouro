// import React, { useState, useEffect } from 'react';
// import MaskInput from 'react-native-mask-input';
// import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import RNPickerSelect from 'react-native-picker-select';
// import { useNavigation } from '@react-navigation/native';
// import styles from './styles'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import api from '../../services/api';

// export default function Profile({ route }) {
//     const navigation = useNavigation();

//     const [name, setName] = useState('');
//     const [age, setAge] = useState('');
//     const [whatsapp, setWhatsapp] = useState('');
//     const [gender, setGender] = useState('');
//     const [city, setCity] = useState('');
//     const [uf, setUf] = useState('');
//     const [goal, setGoal] = useState('');
//     const [biography, setBiography] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const { id } = route.params;


//     async function handleRegister() {
//         try {
//             await api.post('/profile/verify', {
//                 name: name,
//                 whatsapp: whatsapp,
//                 age: age,
//                 gender: gender,
//                 city: city,
//                 uf: uf,
//                 goal: goal,
//                 biography: biography,
//             });

//             const response = await api.post('/profile/register', {
//                 name: name,
//                 whatsapp: whatsapp,
//                 age: age,
//                 gender: gender,
//                 city: city,
//                 uf: uf,
//                 goal: goal,
//                 biography: biography,
//                 id_user: id
//             });

//             Alert.alert('Cadastro realizado com sucesso')

//             navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'Index' }],
//             });

//             navigation.navigate('CadFoto', { id: id });
//         } catch (err) {
//             setErrorMessage(err.response.data.error);
//             Alert.alert(err.response.data.error);
//         }
//     }
//     return (
//         <View style={{ flex: 1 }}>
//             <View style={styles.header}>
//                 <View style={{ flex: 1, alignItems: 'center' }}></View>
//                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                     <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'center' }}>Editar Informações</Text>
//                 </View>
//                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                     <TouchableOpacity onPress={handleRegister}>
//                         <Text style={{ color: '#ff8c00ad', top: 10, left: 20, fontSize: 15 }}>Concluido</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container}>
//                 <View style={{ borderBottomColor: '#CCCCCC', borderBottomWidth: 1, borderTopWidth: 1, borderTopColor: '#CCCCCC', paddingHorizontal: 15, paddingVertical: 15, backgroundColor: '#FFFFFF' }}>
//                     {!!errorMessage && <Text style={{ color: '#FF0000', marginBottom: 20, textAlign: 'center' }}>{errorMessage} </Text>}
//                     <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 15 }}>
//                         <Text style={styles.titulos}>   NOME*</Text>
//                         <TextInput keyboardType='default' multiline={false} clearButtonMode='always' maxLength={25} style={styles.textInput} placeholder='Adicione o nome' value={name} onChangeText={name => setName(name)} />
//                     </View>
//                     <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 15 }}>
//                         <View style={{ flexDirection: 'row' }}>
//                             <Text style={styles.titulos}>   CELULAR*</Text>
//                         </View>
//                         <MaskInput
//                             placeholder='Adicione seu número de celular'
//                             keyboardType='numeric'
//                             style={styles.textInput}
//                             clearButtonMode='always'
//                             value={whatsapp}
//                             onChangeText={(masked, unmasked) => {
//                                 setWhatsapp(unmasked); // you can use the unmasked value as well 
//                             }}
//                             mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
//                         />
//                     </View>
//                     <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 15 }}>
//                         <View style={{ flexDirection: 'row' }}>
//                             <Text style={styles.titulos}>   IDADE*</Text>
//                         </View>
//                         <TextInput keyboardType='numeric' clearButtonMode='always' maxLength={2} style={styles.textInput} placeholder='Adicione sua idade' value={age} onChangeText={age => setAge(age)} />
//                     </View>
//                     <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 15 }}>
//                         <Text style={styles.titulos}>   GÊNERO*</Text>
//                         <RNPickerSelect
//                             placeholder={{
//                                 label: 'Selecionar',
//                                 value: null,
//                             }}
//                             style={{
//                                 ...styles,
//                                 iconContainer: {
//                                     top: 9,
//                                     right: 5,
//                                 },
//                             }}
//                             Icon={() => {
//                                 return <Ionicons name="md-arrow-down" size={24} color="gray" />;
//                             }}
//                             value={gender}
//                             onValueChange={gender => setGender(gender)}
//                             items={[
//                                 { label: 'Masculino', value: 'Masculino' },
//                                 { label: 'Feminino', value: 'Feminino' },
//                                 { label: 'Outro', value: 'Outro' },
//                             ]}
//                         />
//                     </View>
//                     <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#CCCCCC', paddingBottom: 15 }}>
//                         <Text style={styles.titulos}>   SOBRE MIM</Text>
//                         <TextInput multiline={true} placeholder='Fale sobre você' maxLength={150} style={[styles.textInput, { height: 100 }]} value={biography} onChangeText={biography => setBiography(biography)} />
//                     </View>
//                     <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0, 0.05)', paddingBottom: 15 }}>
//                         <Text style={styles.titulos}>   MOSTRAR*</Text>
//                         <RNPickerSelect
//                             placeholder={{
//                                 label: 'Selecionar',
//                                 value: null,
//                             }}
//                             style={{
//                                 ...styles,
//                                 iconContainer: {
//                                     top: 9,
//                                     right: 5,
//                                 },
//                             }}
//                             Icon={() => {
//                                 return <Ionicons name="md-arrow-down" size={24} color="gray" />;
//                             }}
//                             value={goal}
//                             onValueChange={goal => setGoal(goal)}
//                             items={[
//                                 { label: 'Mulheres', value: 'Mulheres' },
//                                 { label: 'Homens', value: 'Homens' },
//                                 { label: 'Ambos', value: 'Ambos' },
//                             ]}
//                         />
//                     </View>
//                     <View style={styles.location}>
//                         <View style={{ flex: 1, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0, 0.05)', paddingBottom: 15 }}>
//                             <Text style={styles.titulos}>   CIDADE</Text>
//                             <TextInput placeholderTextColor='rgba(0,0,0, 0.50)' placeholder='Adicionar Cidade' clearButtonMode='always' multiline={false} maxLength={100} style={styles.textInput} value={city} onChangeText={city => setCity(city)} />
//                         </View>
//                         <View style={{ width: 60, marginLeft: 20, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0, 0.05)', paddingBottom: 15 }}>
//                             <Text style={styles.titulos}>   UF</Text>
//                             <TextInput autoCapitalize='characters' placeholderTextColor='rgba(0,0,0, 0.50)' placeholder='UF' clearButtonMode='always' multiline={false} maxLength={2} style={styles.textInput} value={uf} onChangeText={uf => setUf(uf)} />
//                         </View>
//                     </View>
//                 </View>
//             </KeyboardAwareScrollView>
//         </View>
//     );
// }

