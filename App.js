import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Pressable
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { ScrollView } from 'react-native-web';


function HomeScreen({navigation}) {
  const [usuarios, setUsuarios] = useState([])

  useEffect(()=>{
    loadData()
  }, [])
  const loadData = async () => {
    try{
      const response = await axios.get("http://192.168.3.16:3000/contatos")
      setUsuarios(response.data)
    }catch(error){
      console.log(error)
    }
  }

  
return (
<View style={styles.container}>
<View style={styles.containerContatos}>
{usuarios.map((user)=>(
  <Pressable key={user.id} onPress={()=>{navigation.navigate('alterarContato', 
   {id:user.id, username:user.nome, telefone : user.telefone, email : user.email})}}>
  <View style = {styles.AlingImage}>
   <Image source={{uri:"https://img.icons8.com/ios-filled/50/FFFFFF/user-male-circle.png"}} style={styles.Image}/>

  <View style = {styles.AlignInput}>
          <Text style = {[styles.Text, styles.SpaceInput]}>{user.nome}</Text>
          <Text style = {[styles.Text, styles.SpaceInput]}>{user.telefone}</Text>
          
  </View>
</View>
</Pressable>
))}

</View>
</View>
);
}

function LoginScreen({navigation}) {
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

          <TouchableOpacity onPress={() =>{navigation.navigate('Home')}} style = {styles.Button}>
            <Text style = {styles.TextButton}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{navigation.navigate('CadastroUser')}} style = {styles.Button}>
            <Text style = {styles.TextButton}>Cadastrar</Text>
          </TouchableOpacity>
      </View>
    </View>
)}

function CadastroUserScreen({navigation}) {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState('')

  const saveData = async () => {
    try{
      await axios.post("http://192.168.3.16:3000/usuarios",{
        nome : nome,
        email : email,
        cpf: cpf,
        senha : senha
      })

      navigation.navigate("Home")
    }catch(error){
      console.log(error)
    }
  }
return (
<View style={styles.container}>
      <View style = {styles.contLogin}>

        <View style = {styles.AlignInput}>
          <Text style = {styles.Text}>nome</Text>
          <TextInput onChangeText={setNome} style = {styles.input} placeholder='Escreva aqui'/>
          </View>

         <View style = {styles.AlignInput}>
          <Text style = {styles.Text}>cpf</Text>
          <TextInput onChangeText={setCpf} style = {styles.input} placeholder='Escreva aqui'/>
          </View>

          <View style = {styles.AlignInput}>
          <Text style = {styles.Text}>Email</Text>
          <TextInput onChangeText = {setEmail} style = {styles.input} placeholder='Escreva aqui'/>
          </View>

          <View style = {styles.AlignInput}>
          <Text style = {styles.Text}>Senha</Text>
          <TextInput onChangeText = {setSenha} style = {styles.input} placeholder='Escreva aqui'/>
          </View>

          <TouchableOpacity onPress={saveData} style = {styles.Button}>
            <Text style = {styles.TextButton}>Salvar</Text>
          </TouchableOpacity>
      </View>
    </View>
)}

function CadastroContatoScreen({navigation}) {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState("")

  const salvarContatos = async () =>{
    try{
      await axios.post("http://192.168.3.16:3000/contatos",
      {
        nome: nome,
        email : email,
        telefone : telefone
      })

      navigation.navigate("Home")
    }catch(error){
      console.log(error)
    }
    
  }
return (
<View style={styles.container}>

      <View style = {styles.contLogin}>

        <View style = {styles.AlignInput}>
          <Text style = {styles.Text}>nome</Text>
          <TextInput onChangeText={setNome} style = {styles.input} placeholder='Escreva aqui'/>
          </View>

          <View style = {styles.AlignInput}>
          <Text style = {styles.Text}>Email</Text>
          <TextInput onChangeText={setEmail} style = {styles.input} placeholder='Escreva aqui'/>
          </View>

          <View style = {styles.AlignInput}>
          <Text style = {styles.Text}>Telefone</Text>
          <TextInput onChangeText={setTelefone} style = {styles.input} placeholder='Escreva aqui'/>
          </View>

          <TouchableOpacity onPress={salvarContatos} style = {styles.Button}>
            <Text style = {styles.TextButton}>Salvar</Text>
          </TouchableOpacity>
      </View>
    </View>
)}


function EditarContatoScreen({route}) {
  let {id, username, telefone, email} = route.params
  const [nome, setNome] = useState(username)
  const [Telefone, setTelefone] = useState(telefone)
  const [Email, setEmail] = useState(email)

  const salvarEdicao = async () =>{
    try{
      await axios.put(`http://192.168.3.16:3000/contatos/${id}`,
        {
          nome,
          email: Email,
          telefone : Telefone
        },
      )
      navigation.navigate("Home")

    }catch(error){
      console.log(error)
    }
  }

  const excluirContato = async (id) =>{
    try{
      await axios.delete(`http://192.168.3.16:3000/contatos/${id}`)
      navigation.navigate("Home")
    }
      catch(error){
        console.log(error)
      }
    }

return (
<View style={styles.container}>
      <View style = {styles.contLogin}>

        <View style = {styles.AlignInput}>
          <Text style = {styles.Text}>nome</Text>
          <TextInput onChangeText={setNome} value={nome} style = {styles.input} placeholder='Escreva aqui'/>
          </View>

          <View style = {styles.AlignInput}>
          <Text style = {styles.Text}>Email</Text>
          <TextInput onChangeText={setEmail} value={Email} style = {styles.input} placeholder='Escreva aqui'/>
          </View>

          <View style = {styles.AlignInput}>
          <Text style = {styles.Text}>Telefone</Text>
          <TextInput onChangeText={setTelefone} value={Telefone} style = {styles.input} placeholder='Escreva aqui'/>
          </View>

          <TouchableOpacity onPress={salvarEdicao} style = {styles.Button}>
            <Text style = {styles.TextButton}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> excluirContato(id)} style = {styles.Button}>
            <Text style = {styles.TextButton}>Exluir</Text>
          </TouchableOpacity>
      </View>
    </View>
)}

const Stack = createNativeStackNavigator();

function App() {
return (
<NavigationContainer>
<Stack.Navigator initialRouteName='Login'>
<Stack.Screen name="Home" component={HomeScreen} 
options={({navigation}) => ({
    headerTitleAlign:'center',
   headerTitle: 'Lista de contatos',
   headerRight: ()=>(
      <TouchableOpacity onPress={()=>{navigation.navigate('CadastroContato')}}>
        <Ionicons name='add' size={28} color='black'/>
      </TouchableOpacity>
   ),
  })}
/>
<Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
<Stack.Screen name="CadastroUser" component={CadastroUserScreen} options={{headerTitleAlign: 'center'}}/>
<Stack.Screen name="CadastroContato" component={CadastroContatoScreen} options={{headerTitleAlign: 'center'}}/>
<Stack.Screen name="alterarContato" component={EditarContatoScreen} options={{headerTitleAlign: 'center'}}/>
</Stack.Navigator>
</NavigationContainer>
);
}

export default App;


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
    justifyContent : "center",
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
  },
  AlingImage:{
    width: "80%",
    paddingLeft: 65,
    display : "flex",
    flexDirection: "row",
   justifyContent: "flex-end",
    margin: 20,
    borderBottomColor: "#a2a2a285",
    borderWidth: 2
  },
  containerContatos:{
    width: "90%",
     display: "flex",
     justifyContent: "center",
     alignItems: "center"
  },
  smallButton: {
  width: "81%"
},
  SpaceInput:{
    marginLeft: 20
  }
});