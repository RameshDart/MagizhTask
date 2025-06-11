import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import { ref, push, onValue, set } from 'firebase/database';

function ChatRoomScreen({ route }) {
  const { sender, receiver } = route.params;
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const chatId = [sender, receiver].sort().join('_');
  const chatRef = ref(db, `chats/${chatId}`);

  useEffect(() => {
    set(ref(db, `chatRooms/${sender}/${receiver}`), true);
    set(ref(db, `chatRooms/${receiver}/${sender}`), true);

    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setChat(Object.values(data));
      } else {
        setChat([]);
      }
    });
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      push(chatRef, {
        sender,
        text: message,
        timestamp: Date.now(),
      });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chat}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={item.sender === sender ? styles.self : styles.other}>
            {item.sender}: {item.text}
          </Text>
        )}
      />
      <View style={styles.inputRow}>
        <TextInput value={message} onChangeText={setMessage} placeholder='Type a message' style={styles.input} />
        <Button title='Send' onPress={sendMessage} />
      </View>
    </View>
  );
}

export default ChatRoomScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, padding: 10, marginRight: 10 },
  self: { alignSelf: 'flex-end', backgroundColor: '#dcf8c6', marginVertical: 2, padding: 8 },
  other: { alignSelf: 'flex-start', backgroundColor: '#eee', marginVertical: 2, padding: 8 },
});
