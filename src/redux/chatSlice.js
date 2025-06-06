import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase/config';
import { ref, onValue, push } from 'firebase/database';

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
    setMessages(state, action) {
      const { chatId, messages } = action.payload;
      state.messages[chatId] = messages;
    },
  },
});

export const { login, register, logout, setChats, setMessages } = chatSlice.actions;

export const listenForChats = () => (dispatch) => {
  const chatsRef = ref(db, 'chatList/');
  onValue(chatsRef, (snapshot) => {
    const data = snapshot.val();
    const chats = data ? Object.entries(data).map(([key, value]) => ({ id: key, name: value.name })) : [];
    dispatch(setChats(chats));
  });
};

export const addNewChat = (chatName) => async () => {
  const chatRef = ref(db, 'chatList/');
  await push(chatRef, { name: chatName });
};

export const listenForMessages = (chatId) => (dispatch) => {
  const messagesRef = ref(db, `chats/${chatId}`);
  onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();
    const messages = data ? Object.values(data).sort((a, b) => a.timestamp - b.timestamp) : [];
    dispatch(setMessages({ chatId, messages }));
  });
};

export const sendMessage =
  ({ chatId, message }) =>
  async () => {
    const chatRef = ref(db, `chats/${chatId}`);
    await push(chatRef, message);
  };

export default chatSlice.reducer;
