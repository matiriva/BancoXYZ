import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    StyleSheet ,
    StatusBar,
    Alert,
    Pressable
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {LinearGradient} from 'expo-linear-gradient';


const url = "https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login"

const Login = ({navigation}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('fake-jwt-token')
  const [dataSrv, setDataSrv] = useState([]);

 
  const [check_textInputChange, setcheck_textInputChange] = useState(false)
  const [secureTextEntry, setsecureTextEntry] = useState(true)
  const [isValidUser, setisValidUser] = useState(true)
  const [isValidPassword, setisValidPassword] = useState(true)


  async function postData(url = '', data = {}) {

    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data) 
    });
    
    return response.json(); 
  }


  useEffect(() =>{

  }, []);

    const textInputChange = (val) => {
      setEmail(val);

        if( val.trim().length >= 4 ) {
          setcheck_textInputChange(true);
          setisValidUser(true);
          
        } else {
          setcheck_textInputChange(false);
          setisValidUser(false);
        }
    }

    const handlePasswordChange = (val) => {
      setPassword(val);

        if( val.trim().length >= 4 ) {
          setisValidPassword(true);
        } else {
          setisValidPassword(false);
        }
    }

    const updateSecureTextEntry = () => {
      setsecureTextEntry(!secureTextEntry)
    }

    const login_onPress = async() =>{
        
      // Alert.alert('Entrada incorrecta!','Email ' + userName +  'Val Email ' + dataVal.email, [{text: 'Aceptar'}]);
      // Alert.alert('Entrada incorrecta!','password ' + password + 'Val password ' + dataVal.password, [{text: 'Aceptar'}]);

        if ( email.length == 0 || password.length == 0 ) {
            Alert.alert('Entrada incorrecta!', 'Email y clave no deben estar vacias.', [
                {text: 'Aceptar'}
            ]);
            return;
        }

        if ( email.length == 0 ) {
            Alert.alert('Usuario no válido!', 'Email o clave incorrecta.', [
                {text: 'Aceptar'}
            ]);
            return;
        }

      //console.log('1 token ' + data.token); 
      //console.log('1 message ' + data.message);       
      // console.log('checkService '); 
      // console.log('email ' + dataVal.email); 
      // console.log('password ' + dataVal.password); 
      
      setDataSrv([]);

      postData(url, {email: (email), password: (password)})
              .then(data => {
                  setDataSrv(data);
                  console.log(data); 
                })

      // postData(dataVal.email, dataVal.password)
      //       .then(data => {
      //               setDataSrv(data);
      //             });
      
      console.log('message ' + dataSrv.message); 

       if (!dataSrv.message)
       {
            if (dataSrv.token) 
                await AsyncStorage.setItem('token',dataSrv.token)          
            if (email) 
                await AsyncStorage.setItem('email',email)      
      
          console.log('token ' + dataSrv.token); 
          console.log('email ' + email); 
          console.log('message ' + dataSrv.message); 

          console.log('Login Ok'); 
          navigation.navigate('Home', {name: 'Login'})
      }else{
        console.log('Login Failed'); 
        return;
      }


    }



    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#0F4761' barStyle="light-content"/>
  
        <View style={styles.header}>
            <Text style={styles.text_header} >BancoXYZ</Text>
            <Text style={styles.SubTitulo}>Bienvenido</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                //backgroundColor: '#009387'
            }]}
        >
            <Text style={[styles.text_footer, {
                color: '#0F4761'
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color= "#0F4761"
                    size={20}
                />
                <TextInput  testID='tiEmail'
                    placeholder="Ingrese su email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: '#0F4761'
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => { setEmail(val); textInputChange(val)}}
                    //onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email debe tener mas de 4 carácteres.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: '#0F4761',
                marginTop: 35
            }]}>Contraseña</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color= "black"
                    size={20}
                />
                <TextInput testID='tiPassword'
                    placeholder="Ingrese su contraseña"
                    placeholderTextColor="#666666"
                    secureTextEntry={secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: '#0F4761'
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => { setPassword(val); handlePasswordChange(val)}}/>
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password debe tener al menos 4 carácteres.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity>
                <Text style={{color: '#0F4761', marginTop:15}}>Olvido su clave?</Text>
            </TouchableOpacity>



            {
              dataSrv.message?          
              <View> 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg} > {dataSrv.message}</Text>
                </Animatable.View>
              </View>
              : null
            }

            <View style={styles.button}>
                <TouchableOpacity
                    onPress={() => {login_onPress()}}
                    style={[styles.signIn, {borderColor: '#0F4761',borderWidth: 1,marginTop: 15}]}>
                    {/* <LinearGradient
                        colors={['#f1f1f1', '#f1f1f1']}
                        style={styles.signIn}
                    > */}
                        <Text style={[styles.textSign, { color: '#0F4761'}]}>Ingresar</Text>
                    {/* </LinearGradient> */}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Registrarse')}
                    style={[styles.signIn, { borderColor: '#0F4761', borderWidth: 1, marginTop: 15 }]}>
                   
                   <Text style={[styles.textSign, { color: '#0F4761'}]}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
        <StatusBar style="auto" />
      </View>
    );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#0F4761'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#f1f1f1',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#f1f1f1',
      fontWeight: 'bold',
      fontSize: 30
  },
  SubTitulo: {
      color: '#f1f1f1',
      fontWeight: 'light',// 'bold',
      fontSize: 16
  },
  text_footer: {
      color: '#0F4761',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#0F4761',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      //marginTop:  -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});

