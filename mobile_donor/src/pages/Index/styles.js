import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0FFF0',
    },

    logo: {
        width: 280,
        resizeMode: 'contain',
        marginBottom: 50
    },

    info: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 35
    },

    text: {
        paddingLeft: 35,
        paddingRight: 35,
        textAlign: 'center',
        fontSize: 12,
        color: '#474A51',
    },

    buttons: {
        flex: 1,
        alignItems: 'center',
    },

    button: {
        width: '80%',
        height: '18%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        backgroundColor: '#252525',
    },

    buttonLogin: {
        backgroundColor: 'transparent',
        borderColor: '#000',
        marginTop: 20
    },

    buttonText: {
        color: '#FFF'
    },

    buttonText2: {
        color: '#000'
    },
})

export default styles;