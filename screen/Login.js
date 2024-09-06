import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import React, { useState } from 'react'
//import AsyncStorage from '@react-native-async-storage/async-storage';

export default Login = ({navigation}) => {

const url = "https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login"
  
// const loginData = {
//   email: 'wilson@topaz.com',
//   password: "3333"
// };

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      
    postData(url, {email: (email), password: (password)
    })
    .then(data => {
      setData(data);
      console.log(data); 
    })

    if (data.token)
    {
      console.log(data.token); 
      console.log(data.user.email); 
      
      navigation.navigate('Home', {name: 'Login'})
    } 
  }

  return (

    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.titulo} >BancoXYZ</Text>
        <Text style={styles.subTitle} >Ingrese a su cuenta.!</Text>

        <TextInput onChangeText={(value) => setEmail(value)} style={styles.textInput}  placeholder="name@email.com" />
        <TextInput onChangeText={(value) => setPassword(value)} style={styles.textInput}  placeholder="Password"  secureTextEntry={true} />

        {
          data.message?          
          <View> 
            <Text style={styles.subTitle} >Error:  {data.message}</Text>
          </View>
          : null
        }
        <Pressable onPress={onSubmit} style={styles.buttons} >
          <Text style={styles.buttonsText} >Ingresar</Text>
        </Pressable>     

        <Text style={styles.forgotpassword} > No tengo una cuenta?.</Text>
        <StatusBar style="auto" />        
      </View>
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
  containerSVG: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  titulo:{
    fontSize: 40,
    color: '#0F4761',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    color: 'gray',      
  },
    textInput: {    
      padding: 10,
      paddingStart: 30,
      width: '80%',
      height: 50,
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
    borderRadius: 22,
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
