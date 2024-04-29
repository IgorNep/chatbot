import { RootState } from '../../store/index';
export const selectCurrentChatId = (state: RootState) =>
  state.chat.currentChatId;
export const selectMessages = (state: RootState) => state.chat.messages;
