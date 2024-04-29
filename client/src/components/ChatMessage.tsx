import { ERoles, TMessageProps } from '../features/chat';

const ChatMessage = ({ message }: { message: TMessageProps }) => {
  const gptClass = message.role === ERoles.GPT;

  return (
    <div className={gptClass ? 'bg-stone-400' : ''}>
      <div className='flex max-w-[640px] p-[12px] px-[24px] mx-auto items-center'>
        <div
          className={`bg-white rounded-full w-[40px] h-[40px] flex justify-center items-center ${
            gptClass && 'bg-[#0da37f]'
          }`}
        />
        <div className='px-[40px]'>{message.content}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
