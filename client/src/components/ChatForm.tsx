import { ForwardedRef, forwardRef, SyntheticEvent, useState } from 'react';
import { Button, EIconPosition } from './Button';
import { EIcons, Icon } from './Icon';

export type TEventSubmitProps = SyntheticEvent<HTMLFormElement, SubmitEvent>;

interface IChatFormProps {
  onSubmit: (e: TEventSubmitProps, textInput: string) => void;
}

const ChatForm = forwardRef(
  ({ onSubmit }: IChatFormProps, ref: ForwardedRef<HTMLInputElement>) => {
    const [textInput, setTextInput] = useState('');

    const handleSubmit = (e: TEventSubmitProps) => {
      console.log(textInput);
      if (textInput) {
        onSubmit(e, textInput);
        setTextInput('');
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className='relative h-[60px] w-[80%] my-10 mx-auto'>
          <input
            ref={ref}
            className='bg-[#40414f] w-full h-full py-0 px-4 text-white text-lg border-none outline-none shadow-black'
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder='Type your message...'
          />
          <Button
            title='Send'
            disabled={!textInput}
            className='absolute top-2 right-2'
            icon={<Icon icon={EIcons.SEND} />}
            iconposition={EIconPosition.RIGHT}
          />
        </div>
      </form>
    );
  },
);

ChatForm.displayName = 'ChatForm';

export { ChatForm };
