import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import React, { useState } from 'react'

export default Transferir = ({navigation}) => {

const url = "https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer"
  
  const [cbu, setCBU] = useState('')
  const [valor, setValor] = useState(0)
  const [currency, setCurrency] = useState('USD')
  const [payeerDocument, setPayeerDocument] = useState('12345678900')
  const [transferDate, setTransferDate] = useState('2024-09-24')
  const [token, setToken] = useState('fake-jwt-token')
  const [data, setData] = useState([]);

  const bearer = 'Bearer fake-jwt-token';

async function postData(url = '', data = {}) {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearer,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

  const onSubmit = async() =>{
      
    var number = parseFloat(valor);

    postData(url, { value: (number),  currency: (currency), payeerDocument: (payeerDocument), transferDate: (transferDate) 
    })
    .then(data => {
      setData(data);
      console.log(data); 
    })

    if (data)
    {
      console.log(data.message); 
    } 
  }

  return (

    <View style={styles.mainContainer}>
        
        <Text style={styles.subTitle} >Ingrese Alias o CBU:</Text>

      <View style={styles.container}>
        <TextInput    testID='tiCBU' onChangeText={(value) => setCBU(value)} style={styles.textInput}  placeholder="Alias/CBU" />    
      </View>
        <Text style={styles.subTitle} >Ingrese Valor a transferir:</Text>
      <View style={styles.container}>
        <TextInput     testID='tiValor' onChangeText={(value) => setValor(value)} style={styles.textInput}  placeholder="Valor"  />  
      </View>

        {
          data.message?          
          <View> 
            <Text style={styles.subTitle} > {data.message}</Text>
          </View>
          : null
        }

      <View style={styles.container}>
        <Pressable  testID='tionSubmit'  onPress={onSubmit} style={styles.buttons} >
          <Text style={styles.buttonsText} >Transferir</Text>
        </Pressable>    
      </View> 

        <StatusBar style="auto" />    
    </View>
  );

}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  container: {
     alignItems: 'center',
     justifyContent: 'center',
  },

  titulo:{
    fontSize: 40,
    color: '#0F4761',
    fontWeight: 'bold',
  },
  subTitle: {
    paddingTop: 10,
    paddingStart: 40,
    fontSize: 20,
    color: 'gray', 
    alignItems: 'flex-start',  
    justifyContent: 'flex-start',   
  },
    textInput: {    
       alignItems: 'center',
       justifyContent: 'center',
      padding: 10,
      paddingStart: 30,
      width: '80%',
      height: 40,
      marginTop: 20,
      borderRadius: 30,
      backgroundColor: '#fff',

  },
  forgotpassword: {
    fontSize: 14,
    color: 'gray', 
    marginTop: 60,     
  },
  buttons: {
    
    marginTop: 20,
    width: '40%',
    height: 40,      
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color : '#f1f1f1',
    backgroundColor: '#0F4761',
  },
  buttonsText: {
    fontSize: 14,
    height: 20,   
    color : '#f1f1f1',
  },
});
