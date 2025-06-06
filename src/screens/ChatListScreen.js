import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { listenForChats, addNewChat } from '../redux/chatSlice';
import ChatScreenStyle from './ChatScreenStyle';

function ChatListScreen({ navigation }) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  const [modalVisible, setModalVisible] = useState(false);
  const [newChatName, setNewChatName] = useState('');

  useEffect(() => {
    dispatch(listenForChats());
  }, []);

  const handleNewChat = () => {
    if (!newChatName.trim()) return;
    dispatch(addNewChat(newChatName.trim()));
    setNewChatName('');
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView style={ChatScreenStyle.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
