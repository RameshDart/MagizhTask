import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import LoginScreenStyle from './LoginScreenStyle';

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      navigation.replace('Chats', { username });
      Alert.alert(`Hi ${username}!`, 'Logged in Succesfully');
    }
  };

  return (
    <View style={LoginScreenStyle.container}>
      <TextInput
        placeholder='Enter Username'
        value={username}
        onChangeText={setUsername}
        style={LoginScreenStyle.input}
      />
      <Button title='Login' style={LoginScreenStyle.button} onPress={handleLogin} />
    </View>
  );
}

export default LoginScreen;
