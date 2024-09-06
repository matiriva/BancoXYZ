import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';

export default function Home(){

  const url = "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance"

  useEffect(() =>{
    getData(url)
    .then(data => {
      console.log(data); 
    })
  }
)
  const loginData = {
    email: 'wilson@topaz.com',
    //password: "3333"
  };  
  

  const [balance, setBalance] = useState([]);
  const bearer = 'Bearer fake-jwt-token';

  async function getData(url = '') {
  
    // setEmail(loginData.email)
    // setPassword(loginData.password)
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
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
      //body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const onSubmit = async() =>{

    // setEmail(loginData.email)
    // setPassword(loginData.password)

    getData(url)
    .then(data => {
      setBalance(data)
      console.log(data); 
    })
}

return (
  <View style={styles.mainContainer}>
    <View style={styles.container}>
         <StatusBar style="auto" /> 
          <Text style={styles.subTitle} > Bienvenido {loginData.email} !</Text>

                  {
          balance?
          
          <View testID='ViewTest' style={{ marginTop: 40 }}> 
            <Text style={styles.subTitle} >Balance:  {balance.accountBalance}</Text>
            <Text style={styles.subTitle} >Moneda:  {balance.currency}</Text>
          </View>
          : null

        }
         <Pressable onPress={onSubmit} style={styles.buttons} >
          <Text style={styles.buttonsText} >Refrescar </Text>
        </Pressable> 
    </View>  
  </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 40,
    width: '100%',
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  container: {
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{
    fontSize: 20,
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