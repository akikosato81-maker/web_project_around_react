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

  function handleImageClick(): void {
    handleOpenPopup(imageComponent);
  }

  function handleLikeClick(): void {
    onCardLike(_id);
  }

  function handleDeleteClick(): void {
    onCardDelete(_id);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handleImageClick}
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={likeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}