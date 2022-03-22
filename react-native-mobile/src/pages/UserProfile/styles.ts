import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 10,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 15,
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

    // profileItem: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },

    profileProperty: {
        fontSize: 14,
        color: '#41414D',
        fontWeight: 'bold',
    },

    // rightItems: {
    //     alignItems: 'flex-end'
    // },

    profileValue: {
        fontSize: 15,
        color: '#737380',
        marginTop: 8,
        marginBottom: 24

    }
})