import { ButtonHTMLAttributes } from 'react';

export enum EIconPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: JSX.Element;
  iconposition?: EIconPosition;
}

export const Button = (props: IButtonProps) => {
  const { title, className, icon, iconposition = 'left' } = props;
  const buttonClasses =
    'bg-transparent border border-1 border-white pointer hover:scale-110 hover:border-white disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center';

  return (
    <button {...props} className={`${buttonClasses} ${className}`}>
      {icon && iconposition === EIconPosition.LEFT && (
        <span className='mr-2'>{icon}</span>
      )}
      {title}
      {icon && iconposition === EIconPosition.RIGHT && (
        <span className='ml-2'>{icon}</span>
      )}
    </button>
  );
};
