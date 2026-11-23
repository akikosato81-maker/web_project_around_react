import type React from 'react';
import type { CardData, PopupConfig } from '../../../types/types';
import ImagePopup from '../Popup/ImagePopup/ImagePopup';

type CardProps = {
  card: CardData;
  handleOpenPopup: (popupConfig: PopupConfig) => void;
  onCardLike: (cardId: string) => void;
  onCardDelete: (cardId: string) => void;
};

export default function Card({
  card,
  handleOpenPopup,
  onCardLike,
  onCardDelete,
}: CardProps): React.JSX.Element {
  const { _id, name, link, isLiked } = card;

  const imageComponent: PopupConfig = {
    title: name,
    children: <ImagePopup card={card} />,
  };

  const likeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_is-active' : ''
  }`.trim();

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imageComponent)}
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={() => onCardDelete(_id)}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={likeButtonClassName}
          onClick={() => onCardLike?.(_id)}
        />
      </div>
    </li>
  );
}