import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-web';

export default function App() {
  return (
    <View style={styles.container}>
      <View style = {styles.contLogin}>
          <Image source={{uri:"https://img.icons8.com/ios-filled/50/FFFFFF/user-male-circle.png"}} style={styles.Image}/>
          
          <View style = {styles.AlignInput}>
          <Text style = {styles.Text}>Email</Text>
          <TextInput style = {styles.input} placeholder='Escreva aqui'/>
          </View>

          <View style = {styles.AlignInput}>
          <Text style = {styles.Text}>Senha</Text>
          <TextInput style = {styles.input} placeholder='Escreva aqui'/>
          </View>

          <TouchableOpacity style = {styles.Button}>
            <Text style = {styles.TextButton}>Jogar</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.Button}>
            <Text style = {styles.TextButton}>Cadastrar</Text>
          </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contLogin: {
    width : 450,
    height: 500,
    backgroundColor: "#35353537",
    borderColor : "#a2a2a285",
    borderWidth : 1,
    display : "flex",
    alignItems : "center",
    padding : 50,
    flexDirection : "column",
    
  },

  Image:{
    width: 60,
    height: 60,
    marginBottom: 20
  },
  input:{
    width : "100%",
    backgroundColor: "#000",
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    padding : 8,
    color : "white",
    borderColor:"#a2a2a285",
    borderWidth: 2,
    outlineColor : "#ffff"
  },
  Text: {
    color: "white",
    fontSize: 16,
    fontWeight:"bold",
  },

  AlignInput: {
    width : "100%"
  },

  Button:{
    width : "100%",
    marginBottom: 20,
    borderRadius: 10,
    padding : 8,
    color : "white",
    backgroundColor: "#a2a2a285",
    
  },

  TextButton:{
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight:"bold",
  }

  

});
