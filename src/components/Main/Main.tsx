import type React from 'react';
import { useState } from 'react';
import avatar from '../../images/avatar.jpg';
import type { PopupConfig, CardData } from '../../types/types';
import Popup from './Popup/Popup';
import NewCard from './Popup/NewCard/NewCard';
import EditProfile from './Popup/EditProfile/EditProfile';
import EditAvatar from './Popup/EditAvatar/EditAvatar';
import Card from './Card/Card';

const initialCards: CardData[] = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
  {
    isLiked: false,
    _id: '5d1f067e321eb4bdcd707df',
    name: 'Montañas Calvas',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:12:30.000Z',
  },
  {
    isLiked: false,
    _id: '5d1f06a9d321eb4bdcd707e0',
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:13:00.000Z',
  },
  {
    isLiked: false,
    _id: '5d1f06cfd321eb4bdcd707e1',
    name: 'Parque Nacional de la Vanoise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:14:00.000Z',
  },
  {
    isLiked: false,
    _id: '5d1f06f4d321eb4bdcd707e2',
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:15:00.000Z',
  },
];

export default function Main(): React.JSX.Element {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [popup, setPopup] = useState<PopupConfig | null>(null);

  const newCardPopup: PopupConfig = {
    title: 'Nuevo lugar',
    children: <NewCard />,
  };

  const editProfilePopup: PopupConfig = {
    title: 'Editar perfil',
    children: <EditProfile />,
  };

  const editAvatarPopup: PopupConfig = {
    title: 'Cambiar foto de perfil',
    children: <EditAvatar />,
  };

  function handleOpenPopup(popupConfig: PopupConfig): void {
    setPopup(popupConfig);
  }

  function handleClosePopup(): void {
    setPopup(null);
  }

  function handleCardLike(cardId: string): void {
    setCards((prevCards) =>
      prevCards.map((item) =>
        item._id === cardId ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  }

  function handleConfirmDelete(cardId: string): void {
    setCards((prevCards) => prevCards.filter((item) => item._id !== cardId));
    handleClosePopup();
  }

  function handleCardDeleteClick(cardId: string): void {
    function handleDeleteSubmit(event: React.FormEvent<HTMLFormElement>): void {
      event.preventDefault();
      handleConfirmDelete(cardId);
    }

    const deleteConfirmPopup: PopupConfig = {
        title: '¿Estás seguro/a?',
        children: (
          <form className="popup__form" onSubmit={handleDeleteSubmit}>
            <button className="button popup__button" type="submit">
              Sí
            </button>
          </form>
        ),
      };

    handleOpenPopup(deleteConfirmPopup);
  }

  function handleAvatarClick(): void {
    handleOpenPopup(editAvatarPopup);
  }

  function handleEditProfileClick(): void {
    handleOpenPopup(editProfilePopup);
  }

  function handleAddCardClick(): void {
    handleOpenPopup(newCardPopup);
  }


  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={avatar}
            alt="Avatar"
          />
          <button
            className="profile__avatar-edit-button"
            type="button"
            aria-label="Editar avatar"
            onClick={handleAvatarClick}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">Jacques Cousteau</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={handleEditProfileClick}
          />
          <p className="profile__description">Explorador</p>
        </div>
        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={handleAddCardClick}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={handleOpenPopup}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDeleteClick}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup
          onClose={handleClosePopup}
          title={popup.title ?? ''}
          isOpen={popup !== null}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}