import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import React, { useState } from 'react'

import LogOut from './screen/LogOut';
import Login from './screen/Login';
import Home from './screen/Home';
import TransferenciasLista from './screen/Transferencias';

export default function App() {
  return (
          
    //<Login />
    //<Home /> 
    <TransferenciasLista /> 

  );
}

