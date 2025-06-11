import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Alert } from 'react-native';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase/config';

function ChatListScreen({ navigation, route }) {
  const { username } = route.params;
  const [rooms, setRooms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newChatUser, setNewChatUser] = useState('');

  useEffect(() => {
    const roomRef = ref(db, `chatRooms/${username}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val() || {};
      setRooms(Object.keys(data));
    });

    return () => unsubscribe();
  }, []);

  const startNewChat = () => {
    if (newChatUser.trim() && newChatUser !== username) {
      set(ref(db, `chatRooms/${username}/${newChatUser}`), true);
      set(ref(db, `chatRooms/${newChatUser}/${username}`), true);
      setModalVisible(false);
      setNewChatUser('');
      navigation.navigate('ChatRoom', {
        sender: username,
        receiver: newChatUser,
      });
    } else {
      Alert.alert('Error', 'Enter a valid user to chat with.');
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel' },
      { text: 'Logout', onPress: () => navigation.replace('Login') },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
              navigation.navigate('ChatRoom', {
                sender: username,
                receiver: item,
              })
            }
          >
            <Text style={styles.name}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.actionText}>+ New Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'red' }]} onPress={handleLogout}>
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType='slide'>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder='Enter username'
              value={newChatUser}
              onChangeText={setNewChatUser}
              style={styles.modalInput}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <Button title='Start Chat' onPress={startNewChat} />
              <Button title='Cancel' onPress={() => setModalVisible(false)} color='red' />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 90,
  },
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
  },
  bottomRow: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalInput: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderColor: '#ccc',
  },
});
