import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  chats: [],
  messages: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    register(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    setChats(state, action) {
      state.chats = action.payload;
    },
    sendMessage(state, action) {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) state.messages[chatId] = [];
      state.messages[chatId].push(message);
      AsyncStorage.setItem('messages', JSON.stringify(state.messages));
    },
    loadMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const { login, register, logout, setChats, sendMessage, loadMessages } = chatSlice.actions;

export default chatSlice.reducer;
