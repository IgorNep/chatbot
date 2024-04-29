import { ERoles, TMessageProps } from '../features/chat';
import gptImage from '../assets/icons/chatgpt-icon.svg';
import userImage from '../assets/icons/user-profile-icon.svg';

const ChatMessage = ({ message }: { message: TMessageProps }) => {
  const isGpt = message.role === ERoles.GPT;

  return (
    <div
      className={`flex items-center p-[12px] px-[24px] ${
        isGpt ? 'bg-stone-400' : ''
      }`}
    >
      <img src={isGpt ? gptImage : userImage} className='w-[40px] h-[40px]' />
      <div className='px-[40px]'>{message.content}</div>
    </div>
  );
};

export default ChatMessage;
