import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF3F1',
    },

    logo: {
        width: 280,
        resizeMode: 'contain',
        marginBottom: 50
    },

    infoView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 35
    },

    termsText: {
        paddingLeft: 35,
        paddingRight: 35,
        textAlign: 'center',
        fontSize: 12,
        color: '#474A51',
    },

    buttonsView: {
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
        borderColor: '#506175',
        backgroundColor: '#506175',
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