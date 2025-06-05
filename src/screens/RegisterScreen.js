import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, RegisterScreenStyleheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { register } from '../redux/chatSlice';
import RegisterScreenStyle from './RegisterScreenStyle';

function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (name.trim()) {
      dispatch(register({ name }));
      navigation.replace('Chats');
    }
  };

  return (
    <View style={RegisterScreenStyle.container}>
      <Text style={RegisterScreenStyle.title}>Register</Text>

      <TextInput
        style={RegisterScreenStyle.input}
        placeholder='Choose a username'
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={RegisterScreenStyle.button} onPress={handleRegister}>
        <Text style={RegisterScreenStyle.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={RegisterScreenStyle.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RegisterScreen;
