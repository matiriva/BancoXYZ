import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ prop }) {

  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [balance, setBalance] = useState([]);

  const url = "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance";

  

  useEffect(() =>{
      getUser();
      getData().then(data => { setBalance(data);});
      setIsLoading(false);
    }, []);

    if (isLoading) {
      return   (
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large"/>
              </View>)
    }

  async function getUser() {
    try {
          AsyncStorage.getItem('email').then (value => {if (value != null){ setEmail(value);}})
          AsyncStorage.getItem('token').then (value => {if (value != null){ setToken(value);}})

          console.log(email);
          console.log(token);
        } catch (error) {
            console.log(error);
        }
  }
  
  async function getData() {

    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
    });

    const json = await response.json();

   return json;
  }


  

  const onSubmit = async() =>{

    getData(url)
    .then(data => {
      setBalance(data)
      //console.log(data); 
    })
}

return (
  <View style={styles.mainContainer}>
    <View style={styles.container}>
         <StatusBar style="auto" /> 
          <Text style={styles.subTitle} > Bienvenido {email} !</Text>

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
  )

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