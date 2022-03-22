import React from 'react';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
    },

    logo: {
        alignSelf: 'center',
        width: 140,
        height: 90,
        resizeMode: 'contain'
    },

    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
        marginTop: 0,
    },

    cards: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 25,
        overflow: 'hidden',
        position: 'absolute',
        left: 0,
        right: 0,
        height: 400,
    },

    avatar: {
        flex: 1,
        height: 300,
        backgroundColor: '#fff',
        
    },

    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18,
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 25,
        justifyContent: 'center', 
        alignItems: 'center',
        top: 5
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },
});

export default styles;