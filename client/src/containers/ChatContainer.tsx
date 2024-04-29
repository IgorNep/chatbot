import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';

import {
  selectCurrentChatId,
  selectMessages,
  setChatId,
  setCurrentChat,
  setMessages,
  IChatProps,
  useGetAllChatsQuery,
  useRemoveChatMutation,
  useSaveChatMutation,
} from '../features/chat';
import ChatMessage from '../components/ChatMessage';
import { Button } from '../components/Button';
import { EIcons, Icon } from '../components/Icon';
import { ChatForm, TEventSubmitProps } from '../components/ChatForm';

export const ChatContainer = () => {
  const dispatch = useDispatch();
  const currentChatId = useSelector(selectCurrentChatId);
  const messages = useSelector(selectMessages);
  const { data } = useGetAllChatsQuery('');
  const [saveChat] = useSaveChatMutation();
  const [removeChat] = useRemoveChatMutation();
  const bottomRefPanel = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const setNewChat = () => {
    dispatch(setChatId());
    focusInput();
  };

  useEffect(() => {
    const savedChat = JSON.parse(localStorage.getItem('savedChat') || '{}');
    if (savedChat && !isEmpty(savedChat)) {
      dispatch(setCurrentChat(savedChat));
    } else if (!currentChatId) {
      setNewChat();
    }
  }, []);

  const handleSubmit = async (e: TEventSubmitProps, textInput: string) => {
    e.preventDefault();
    if (textInput) {
      const newMessage = {
        id: uuidv4(),
        role: 'user',
        content: `${textInput}`,
      };
      dispatch(setMessages(newMessage));

      const savedChatFromLS = JSON.parse(
        localStorage.getItem('savedChat') || '{}',
      );
      if (savedChatFromLS.messages) {
        const newMessages = [...savedChatFromLS.messages, newMessage];
        localStorage.setItem(
          'savedChat',
          JSON.stringify({ chatId: currentChatId, messages: newMessages }),
        );
      } else {
        localStorage.setItem(
          'savedChat',
          JSON.stringify({ chatId: currentChatId, messages: [newMessage] }),
        );
      }

      try {
        const res = await axios.post(import.meta.env.VITE_BASE_URL, {
          message: textInput,
        });

        const { id, choices } = res.data.response;
        const responseMessage = choices[0].message;

        const gptResponse = {
          id,
          content: responseMessage.content,
          role: responseMessage.role,
        };
        dispatch(setMessages(gptResponse));
        const savedChatFromLS = JSON.parse(
          localStorage.getItem('savedChat') || '{}',
        );
        if (savedChatFromLS.messages) {
          const newMessages = [...savedChatFromLS.messages, gptResponse];
          localStorage.setItem(
            'savedChat',
            JSON.stringify({ chatId: currentChatId, messages: newMessages }),
          );
        }
      } catch (error) {
        // if (typeof error === AxiosError) setError(error.message);
        console.error('An error occurred. Please try again later.');
      }
    }
  };

  const handleSetCurrentChat = (chat: IChatProps) => {
    dispatch(setCurrentChat(chat));
    localStorage.setItem('savedChat', JSON.stringify(chat));
  };

  const handleCreateNewChat = () => {
    setNewChat();
    localStorage.removeItem('savedChat');
  };

  const handleSaveChat = async () => {
    const newChat = {
      chatId: currentChatId,
      messages,
    } as IChatProps;

    await saveChat(newChat);
  };

  useEffect(() => {
    if (bottomRefPanel.current) {
      bottomRefPanel.current.scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    focusInput();
  }, []);

  return (
    <>
      <aside className='w-[240px] p-4 bg-[#202123] text-center'>
        <Button
          title='New Chat'
          icon={<Icon icon={EIcons.ADD} />}
          onClick={handleCreateNewChat}
          className='mb-6 mx-auto'
        />
        {!isEmpty(data?.chats) && (
          <>
            <div className='mb-2'>Saved chats:</div>
            <ul className='saved-chats'>
              {data?.chats?.map((chat) => (
                <li
                  key={chat.chatId}
                  className={cn(
                    'flex justify-between border-b-2 border-white hover:opacity-70 cursor-pointer',
                    {
                      'bg-gray-600': chat.chatId === currentChatId,
                    },
                  )}
                >
                  <span onClick={() => handleSetCurrentChat(chat)}>
                    {new Date(chat.savedAt).toLocaleString()}
                  </span>
                  <span onClick={() => removeChat(chat.chatId)}>X</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>
      <section className='bg-[#343541] flex-1 relative'>
        <header className='bg-[#4b5080] flex justify-end py-4 px-6'>
          <Button
            title='Clear current chat'
            onClick={handleCreateNewChat}
            icon={<Icon icon={EIcons.DELETE} />}
            disabled={isEmpty(messages)}
          />
          <Button
            title='Save chat'
            onClick={handleSaveChat}
            icon={<Icon icon={EIcons.SAVE} />}
            disabled={isEmpty(messages)}
          />
        </header>
        <div className='p-10 text-left max-h-[75%] overflow-auto'>
          {messages?.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          <div ref={bottomRefPanel}></div>
        </div>
        <div className='absolute bottom-0 left-0 right-0'>
          <ChatForm onSubmit={handleSubmit} ref={inputRef} />
        </div>
      </section>
    </>
  );
};
