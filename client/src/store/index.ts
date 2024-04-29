import { configureStore } from '@reduxjs/toolkit';
import { chatApi } from '../features/chat/chatService';
import chatReducer from '../features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
