import type React from 'react';
import { useState } from 'react';

type CardFormErrors = {
  title: string;
  link: string;
};

export default function NewCard(): React.JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [errors, setErrors] = useState<CardFormErrors>({
    title: '',
    link: '',
  });
  const [touched, setTouched] = useState<{
    title: boolean;
    link: boolean;
  }>({
    title: false,
    link: false,
  });

  function validateTitle(value: string): string {
    const trimmed = value.trim();

    if (!trimmed) {
      return 'Completa este campo';
    }

    if (trimmed.length === 1) {
      return 'Extiende este texto para que tenga 2 caracteres o más (actualmente usas 1 carácter).';
    }

    if (trimmed.length < 2 || trimmed.length > 30) {
      return 'El título debe tener entre 2 y 30 caracteres.';
    }

    return '';
  }

  function validateLink(value: string): string {
    const trimmed = value.trim();

    if (!trimmed) {
      return 'Completa este campo';
    }

    try {
      const parsedUrl = new URL(trimmed);
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        return 'Ingresa una URL.';
      }
      return '';
    } catch {
      return 'Ingresa una URL.';
    }
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setTitle(value);
    setTouched((prev) => ({ ...prev, title: true }));
    setErrors((prev) => ({
      ...prev,
      title: validateTitle(value),
    }));
  }

  function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setLink(value);
    setTouched((prev) => ({ ...prev, link: true }));
    setErrors((prev) => ({
      ...prev,
      link: validateLink(value),
    }));
  }

  function handleBlur(fieldName: 'title' | 'link'): void {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    if (fieldName === 'title') {
      setErrors((prev) => ({ ...prev, title: validateTitle(title) }));
    } else {
      setErrors((prev) => ({ ...prev, link: validateLink(link) }));
    }
  }

  const isTitleValid = validateTitle(title) === '';
  const isLinkValid = validateLink(link) === '';
  const isFormValid = isTitleValid && isLinkValid;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const titleError = validateTitle(title);
    const linkError = validateLink(link);

    setTouched({ title: true, link: true });
    setErrors({ title: titleError, link: linkError });

    if (!titleError && !linkError) {
      console.log('Nueva tarjeta lista para crear:', {
        name: title.trim(),
        link: link.trim(),
      });
    }
  }

  return (
    <form
      className="popup__form"
      id="new-card-form"
      name="new-card-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__field">
        <input
          id="card-title"
          className={`popup__input popup__input_type_card-name ${
            touched.title && errors.title ? 'popup__input_type_error' : ''
          }`.trim()}
          name="name"
          placeholder="Título"
          value={title}
          minLength={2}
          maxLength={30}
          required
          type="text"
          onChange={handleTitleChange}
          onBlur={() => handleBlur('title')}
        />
        <span
          className={`popup__error ${
            touched.title && errors.title ? 'popup__error_visible' : ''
          }`.trim()}
          id="card-title-error"
          style={{ color: '#ff0000' }}
        >
          {touched.title ? errors.title : ''}
        </span>
      </label>

      <label className="popup__field">
        <input
          id="card-link"
          className={`popup__input popup__input_type_url ${
            touched.link && errors.link ? 'popup__input_type_error' : ''
          }`.trim()}
          name="link"
          placeholder="Enlace a la imagen"
          value={link}
          required
          type="url"
          onChange={handleLinkChange}
          onBlur={() => handleBlur('link')}
        />
        <span
          className={`popup__error ${
            touched.link && errors.link ? 'popup__error_visible' : ''
          }`.trim()}
          id="card-link-error"
          style={{ color: '#ff0000' }}
        >
          {touched.link ? errors.link : ''}
        </span>
      </label>

      <button
        className={`button popup__button ${
          !isFormValid ? 'popup__button_disabled' : ''
        }`.trim()}
        type="submit"
        disabled={!isFormValid}
      >
        Crear
      </button>
    </form>
  );
}