import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
// import ButtonGradient from './components/ButtonGradient';
import React, { useState } from 'react'
// import { Button } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)

  const onSubmit = async() =>{
    await AsyncStorage.setItem('token', username)
    if( email === 'matias' && password === '1234' )  {

      // console.log('Loging Ok')
    }else{
      console.log('Password Fail')
    }

  }

  return (

    <View style={styles.mainContainer}>

      <View style={styles.container}>
        <Text style={styles.titulo} >BancoXYZ</Text>
        <Text style={styles.subTitle} >Ingrese a su cuenta.!</Text>

        <TextInput onChangeText={(value) => setEmail(value)} style={styles.textInput}  placeholder="name@email.com" />
        
        <TextInput onChangeText={(value) => setPassword(value)} style={styles.textInput}  placeholder="Password" />

        {/* <Text style={styles.forgotpassword} >email: {email}</Text> */}
        
        {/* <Text style={styles.forgotpassword} > password: {password} </Text> */}

        <Button title='Ingresar ' style={styles.buttons}  onPress={onSubmit}  />       
        {/* <ButtonGradient   />        */}
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
    color: '#34434D',
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
    padding: 40,
    marginTop: 20,
    width: '80%',
    height: 50,      
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
