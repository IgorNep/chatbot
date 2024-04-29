export interface IMessageProps {
  id: string;
  role: string;
  content: string;
}

export interface IChatProps {
  chatId: string;
  messages: IMessageProps[];
  savedAt: string;
}

export type IChatsProps = {
  chats?: IChatProps[];
};

export enum ERoles {
  USER = 'user',
  GPT = 'assistant',
}

export type TMessageProps = {
  role: ERoles;
  content: string;
  id: string;
};

export interface ChatState {
  messages: TMessageProps[];
  currentChatId: string | null;
}
