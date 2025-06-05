import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, LoginScreenStyleheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/chatSlice';
import LoginScreenStyle from './LoginScreenStyle';

function LoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (name) {
      dispatch(login({ name }));
      navigation.replace('Chats');
    }
  };

  return (
    <View style={LoginScreenStyle.container}>
      <Text style={LoginScreenStyle.title}>Login</Text>

      <TextInput style={LoginScreenStyle.input} placeholder='Enter your name' value={name} onChangeText={setName} />

      <TouchableOpacity style={LoginScreenStyle.button} onPress={handleLogin}>
        <Text style={LoginScreenStyle.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={LoginScreenStyle.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;
