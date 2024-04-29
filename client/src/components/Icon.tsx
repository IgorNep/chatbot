import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

export enum EIcons {
  ADD = 'add',
  SEND = 'send',
  SAVE = 'save',
  DELETE = 'delete',
}

export const iconsMap: Record<EIcons, JSX.Element> = {
  [EIcons.ADD]: <AddIcon />,
  [EIcons.SEND]: <SendIcon />,
  [EIcons.SAVE]: <SaveIcon />,
  [EIcons.DELETE]: <DeleteIcon />,
};

export const Icon = ({ icon: Icon }: { icon: EIcons }) => {
  return iconsMap[Icon];
};
