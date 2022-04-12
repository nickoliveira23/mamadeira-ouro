import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';



export default StyleSheet.create({
    container: {
        backgroundColor: "#F8F8FF",
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 50,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    viewtitle: {
        marginLeft: 10,
        marginBottom: 10
    },

    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    logoutIcon: {
        margin: 0,
    },

    icon: {
        position: 'absolute',
        right: 0,
        padding: 15
    },

    profile: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
    },

    profileProperty: {
        fontSize: 14,
        color: '#41414D',
        fontWeight: 'bold',
    },

    profileValue: {
        fontSize: 15,
        color: '#737380',
        marginTop: 8,
        marginBottom: 24

    }
})