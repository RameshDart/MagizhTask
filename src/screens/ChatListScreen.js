import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ChatScreenStyleheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setChats } from '../redux/chatSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatScreenStyle from './ChatScreenStyle';

function ChatListScreen({ navigation }) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  const [modalVisible, setModalVisible] = useState(false);
  const [newChatName, setNewChatName] = useState('');

  const handleNewChat = async () => {
    if (!newChatName.trim()) {
      return;
    }
    const newChat = { id: Date.now().toString(), name: newChatName.trim() };
    const updatedChats = [...chats, newChat];
    dispatch(setChats(updatedChats));
    await AsyncStorage.setItem('chats', JSON.stringify(updatedChats));
    setNewChatName('');
    setModalVisible(false);
  };

  useEffect(() => {
    const loadChats = async () => {
      const data = await AsyncStorage.getItem('chats');
      if (data) {
        dispatch(setChats(JSON.parse(data)));
      }
    };
    loadChats();
  }, []);

  return (
    <KeyboardAvoidingView style={ChatScreenStyle.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        contentContainerStyle={ChatScreenStyle.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={ChatScreenStyle.chatItem}
            onPress={() => navigation.navigate('ChatRoom', { chatId: item.id, name: item.name })}
          >
            <Text style={ChatScreenStyle.chatText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={ChatScreenStyle.bottomButtonWrapper}>
        <TouchableOpacity style={ChatScreenStyle.bottomButton} onPress={() => setModalVisible(true)}>
          <Text style={ChatScreenStyle.bottomButtonText}>+ New Chat</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType='slide' transparent>
        <View style={ChatScreenStyle.modalWrapper}>
          <View style={ChatScreenStyle.modalContent}>
            <Text style={ChatScreenStyle.modalTitle}>Create New Chat</Text>
            <TextInput
              value={newChatName}
              onChangeText={setNewChatName}
              placeholder='Name'
              style={ChatScreenStyle.modalInput}
            />
            <TouchableOpacity style={ChatScreenStyle.modalButton} onPress={handleNewChat}>
              <Text style={ChatScreenStyle.modalButtonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[ChatScreenStyle.modalButton, { backgroundColor: 'red' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={ChatScreenStyle.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

export default ChatListScreen;
