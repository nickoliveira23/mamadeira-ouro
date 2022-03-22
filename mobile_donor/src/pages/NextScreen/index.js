// import React, { useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { View, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// export default function NextScreen() {
//     const navigation = useNavigation();
//     const [loggedInUser, setLoggedInUser] = useState(null);

//     useEffect(() => {
//         let mounted = true;
//         async function GoToNextScreen() {
//             const token = await AsyncStorage.getItem('@CodeApi:token');
//             const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'));

//             if (token && user) {
//                 if (mounted) {
//                     setLoggedInUser(user);
//                 }
                
//                 navigation.reset({
//                     index: 0,
//                     routes: [{ name: 'Home', params: { id: user.id } }],
//                 });
//             } else {
//                 navigation.reset({
//                     index: 0,
//                     routes: [{ name: 'Index' }]
//                 });
//             }
//         }
//         GoToNextScreen();
//         return () => mounted = false;
//     }, []);

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <ActivityIndicator size="large" color="#00ff00" />
//         </View>
//     );
// }