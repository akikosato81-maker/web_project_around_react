import type React from 'react';
import { useEffect } from 'react';

type PopupProps = {
  onClose: () => void;
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
};

export default function Popup(props: PopupProps): React.JSX.Element {
  const { title, children, onClose, isOpen } = props;

  useEffect(() => {
    if (!isOpen) return;

    function handleEscKey(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>): void {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup ${isOpen ? 'popup_is-opened' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__content">
        <button
          aria-label="Close popup"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        {children}
      </div>
    </div>
  );
}