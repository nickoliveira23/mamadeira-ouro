import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Constants.statusBarHeight + 20,
  },

  elements: {
    flex: 1,
    justifyContent: 'center'
  },

  header: {
    left: 30,
  },

  title: {
    textAlign: 'center',
    fontSize: 55,
    fontWeight: 'bold',
    color: 'rgba(0,0,0, 0.75)'
  },

  inputArea: {
    alignItems: 'center',
  },

  inputText: {
    marginTop: 20,
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C3C3C5',
    flexDirection: 'row',
    padding: 10
  },

  confirmation: {
    marginTop: 50,
    alignItems: 'center'
  },

  alertMessage: {
    marginTop: 40,
    textAlign: 'center',
    color: 'rgba(0,0,0,0.46)',
    fontSize: 10,
    width: 250
  },

  button: {
    width: 300,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgb(195,195,197)', 
    marginBottom: 50
    
  },

  textButton: {
    color: '#707070',
  }
})

export default styles;