import { ERoles, TMessageProps } from '../features/chat';

const ChatMessage = ({ message }: { message: TMessageProps }) => {
  const gptClass = message.role === ERoles.GPT ? 'chatgpt' : '';

  return (
    <div className={`chat-message ${gptClass}`}>
      <div className='chat-message-center'>
        <div className={`avatar ${gptClass}`} />
        <div className='message'>{message.content}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
