import { memo, HTMLAttributes, ReactNode } from 'react';
import Box from './Box';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed left-0 top-0 h-full w-full backdrop-brightness-75" onClick={onClose}>
      <Box className="fixed left-1/2 top-1/2 z-50 max-w-sm -translate-x-1/2 -translate-y-1/2 transform shadow-lg">
        {children}
      </Box>
    </div>
  );
};

export default memo(Modal);
