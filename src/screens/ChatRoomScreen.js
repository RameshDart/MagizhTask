import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { listenForMessages, sendMessage } from '../redux/chatSlice';

function ChatRoomScreen({ route }) {
  const { chatId, name } = route.params;
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages[chatId] || []);
  const user = useSelector((state) => state.chat.user);

  useEffect(() => {
    dispatch(listenForMessages(chatId));
  }, [chatId]);

  const handleClick = () => {
    if (!text.trim()) return;

    const newMsg = {
      text: text.trim(),
      sender: user?.name || 'Anonymous',
      timestamp: Date.now(),
    };
    dispatch(sendMessage({ chatId, message: newMsg }));
    setText('');
  };

  const renderList = ({ item }) => (
    <Text
      style={{
        padding: 8,
        marginVertical: 2,
        borderRadius: 6,
        backgroundColor: item.sender === user?.name ? '#dcf8c6' : '#eee',
      }}
    >
      {item.sender}: {item.text} ({new Date(item.timestamp).toLocaleTimeString()})
    </Text>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList data={messages} keyExtractor={(_, i) => i.toString()} renderItem={renderList} />
      <TextInput
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, marginBottom: 5, padding: 10, borderRadius: 5 }}
        placeholder='Type your message'
      />
      <Button title='Send' onPress={handleClick} />
    </View>
  );
}

export default ChatRoomScreen;
