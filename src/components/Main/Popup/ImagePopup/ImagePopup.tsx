import type React from 'react';
import type { CardData } from '../../../../types/types';

type ImagePopupProps = {
  card: CardData;
};

export default function ImagePopup(props: ImagePopupProps): React.JSX.Element {
  const { card } = props;

  return (
    <>
      <img
        className="popup__image"
        src={card.link}
        alt={card.name}
      />
      <p className="popup__caption">{card.name}</p>
    </>
  );
}