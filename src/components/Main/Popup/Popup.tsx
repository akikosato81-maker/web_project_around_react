import type React from 'react';

type PopupProps = {
  onClose: () => void;
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
};

export default function Popup(props: PopupProps): React.JSX.Element {
  const { title, children, onClose, isOpen } = props;

  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
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