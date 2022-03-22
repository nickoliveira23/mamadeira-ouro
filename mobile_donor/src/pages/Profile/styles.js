import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
    header: {
        height: 60,
        marginTop: 20,
        flexDirection: 'row',
    },

    titulos: {
        color: 'rgba(0,0,0, 0.75)',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8
    },

    textInput: {
        height: 40,
        fontWeight: '200',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 4,
        paddingStart: 13,
    },

    picker: {
        marginTop: -20,
        height: 50,
        width: 220,
    },

    inputIOS: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 4,
        color: 'rgba(0,0,0, 0.7)',
        paddingRight: 30,
    },

    inputAndroid: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },

    location: {
        flexDirection: 'row',
    },

})

export default styles;