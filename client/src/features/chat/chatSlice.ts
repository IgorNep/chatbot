import { createSlice, nanoid } from '@reduxjs/toolkit';
import { ChatState } from './types';

const initialState: ChatState = {
  messages: [],
  currentChatId: null,
};

export const counterSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatId: (state, action: { type: string; payload?: string }) => {
      const id = action.payload ?? nanoid();
      state.currentChatId = id;
      state.messages = [];
    },
    setCurrentChat: (state, action) => {
      state.currentChatId = action.payload.chatId;
      state.messages = action.payload.messages;
    },
    setMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { setChatId, setCurrentChat, setMessages } = counterSlice.actions;

export default counterSlice.reducer;
