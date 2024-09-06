import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import user_login from './Api/UserApi';
//import ApiManager from './Api/ApiManager';
//import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView from 'react-native-maps'
import { CommonActions } from '@react-navigation/native';

export default function Login() {
//   return (
          
//     <Principal />

// );
  const Stack = createNativeStackNavigator();
 

//const url = "https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login"
const url = "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance"
  
const loginData = {
  email: 'wilson@topaz.com',
  password: "3333"
};


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('fake-jwt-token')
  const [data, setData] = useState(undefined);

  const bearer = 'Bearer fake-jwt-token';

  // const loginData = () => {
  //   fetch(url, {
  //       method: 'POST',
  //       headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           'Authorization': bearer,
  //       },
  //       body: JSON.stringify({
  //           email: email,
  //           password: password,
  //           //token: "fake-jwt-token"
  //       })
  //   })

  //       .then((response) => response.json())
  //       .then(data => {
  //           if (!data.error) {
              
  //             console.log('valid data')
  //             //555setData(data);
  //             //Alert.alert('invalid data');
  //               //props.navigation.navigate("Home", { data: data })
  //           }
  //           else {
  //               alert('invalid data');
  //           }
  //       })
  //       .catch((error) => {
  //           console.error(error);
  //            alert('invalid data');
  //       });
  //     }


async function getData(url = '', data = {}) {
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
    //await AsyncStorage.setItem('token', email)
      
    setEmail(loginData.email)
    setPassword(loginData.password)
    //handleLogin();
   // loginData();

    getData(url, {email: (email), password: (password)
    })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    })

    //alert("Data"+ (data));
        //return <HomeScreen/>
          console.log('Data Token:' + (data));
        return (
          
              <Principal />
          
      );
     // navigation.replace("HomeScreen")
    //return 
    //<Redirect href="screen/HomeScreen" ></Redirect>;

    //console.log('Data Token:' + (data))
    // return (
    //   <HomeScreen /> 
    // );
    //navigation.navigate('HomeScreen')

    // if( email === 'matias' && password === '1234' )  {        
    //     alert("Login Ok, id: " + (data));
    //     console.log('Loging Ok')
    // }else{
    //   //console.log('Login Fail: ' + (data.id))
    //   alert("Login Fail"+ (data.user));
    //   console.log('Login Fail ' + (data.user))
    // }

  }

  const getAPIdata = async () => {    
  //const url = "https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login"
  //const url = "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance"
  //const url = "https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login"
    const url = "https://jsonplaceholder.typicode.com/posts/1";    
    let result = await fetch(url);    
    result = await result.json();
    setData(result);
  }

// const handleGetToken = async () => {
//   const dataToken = await AsyncStorage.getItem("token")
//   if(!dataToken){
//     navigation.replace("App")
//   }else{
//     navigation.replace("Principal")
//   }
// }


 const handleLogin = async () => {   
      user_login({      
      email: email,      
      password: password,    
      })    
      .then(result => {    
        if (result.status == 200) {    
            setToken(result.token)
            //AsyncStorage.setItem('token', result.data);          
            //navigation.replace('Principal');    
            }
      })    
      .catch(err => {    
      	console.error(err);    
      });
    
  }


  return (

    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.titulo} >BancoXYZ</Text>
        <Text style={styles.subTitle} >Ingrese a su cuenta.!</Text>

        <TextInput onChangeText={(value) => setEmail(value)} style={styles.textInput}  placeholder="name@email.com" />
        
        <TextInput onChangeText={(value) => setPassword(value)} style={styles.textInput}  placeholder="Password" />

        {
          data?
          
          <View> 
            <Text style={styles.subTitle} >msg:  {data.message}</Text>
          </View>
          : null

        }

         <Text style={styles.forgotpassword} >email: {email}</Text> 
        
        <Text style={styles.forgotpassword} > password: {password} </Text>

        {/* <Button title='Ingresar ' style={styles.buttons}  onPress={onSubmit}  />       */}
        <Pressable onPress={onSubmit} style={styles.buttons} >
          <Text style={styles.buttonsText} >Ingresar</Text>
        </Pressable>     

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
    width: '40%',
    height: 20,      
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    color : '#f1f1f1',
    backgroundColor: '#0F4761',
  },
  buttonsText: {
    fontSize: 20,
    height: 30,     
    alignItems: 'center',
    justifyContent: 'center',
    color : '#f1f1f1',
  },
});
