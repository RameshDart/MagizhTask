import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadMessages, sendMessage } from '../redux/chatSlice';

function ChatRoomScreen({ route }) {
  const { chatId, name } = route.params;
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages[chatId] || []);
  const user = useSelector((state) => state.chat.user);

  const handleClick = () => {
    const newMsg = {
      text,
      sender: user.name,
      timestamp: new Date().toLocaleTimeString(),
    };
    dispatch(sendMessage({ chatId, message: newMsg }));
    setText('');
  };

  const renderList = ({ item }) => (
    <Text style={{ padding: 5, backgroundColor: item.sender === user.name ? '#dcf8c6' : '#eee' }}>
      {item.sender}: {item.text} ({item.timestamp})
    </Text>
  );
  const load = async () => {
    const data = await AsyncStorage.getItem('messages');
    if (data) dispatch(loadMessages(JSON.parse(data)));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList data={messages} keyExtractor={(_, i) => i.toString()} renderItem={renderList} />
      <TextInput value={text} onChangeText={setText} style={{ borderWidth: 1, marginBottom: 5 }} />
      <Button title='Send' onPress={handleClick} />
    </View>
  );
}

export default ChatRoomScreen;
