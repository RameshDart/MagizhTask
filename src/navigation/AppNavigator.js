import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ChatListScreen from '../screens/ChatListScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName='Login'>
    <Stack.Screen name='Login' component={LoginScreen} />
    <Stack.Screen name='Register' component={RegisterScreen} />
    <Stack.Screen name='Chats' component={ChatListScreen} />
    <Stack.Screen
      name='ChatRoom'
      options={({ route }) => ({ title: route.params?.name || 'Chat Room' })}
      component={ChatRoomScreen}
    />
  </Stack.Navigator>
);

export default AppNavigator;
