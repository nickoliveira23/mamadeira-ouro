import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
      flex:1,
      paddingTop:50,
      padding:30,
      backgroundColor:'#F5F5F5',
      alignItems:'center'
    },
    area1:{
      height:250,
      alignItems:'center',

    },
    area2:{
      flex:1,
      justifyContent:'flex-end',
      alignItems:'center'
    },
    txtNumero:{
      marginTop:60,
      fontSize:55,
      fontWeight:'bold',
      color:'rgba(0,0,0, 0.75)'
    },
    areaNumero:{
      marginTop:30,
      width:300,
      height:50,
      alignItems:'center',
      justifyContent:'space-around',
      flexDirection:'row',
    },
    numero:{
      color:'rgba(0,0,0, 0.75)'
    },
    txtCodigo:{
      marginTop:20,
      textAlign:'center',
      color:'rgba(0,0,0,0.46)',
      fontSize:10,
      width:250
    },
    botao:{
      width:315,
      height:53,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:25,
      borderColor:'rgba(0,0,0, 0.75)',
      borderWidth:1,
    },
    textoBotao:{
      color:'rgba(0,0,0, 0.75)',
      textAlign:'center'
    }
  })

  export default styles;