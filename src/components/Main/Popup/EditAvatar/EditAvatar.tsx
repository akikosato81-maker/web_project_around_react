import type React from 'react';
import { useState } from 'react';

export default function EditAvatar(): React.JSX.Element {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  function validateAvatarUrl(value: string): string {
    const trimmed = value.trim();

    if (!trimmed) {
      return 'Ingresa una URL.';
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setAvatarUrl(value);
    setTouched(true);
    setError(validateAvatarUrl(value));
  }

  function handleBlur(): void {
    setTouched(true);
    setError(validateAvatarUrl(avatarUrl));
  }

  const isFormValid = validateAvatarUrl(avatarUrl) === '';

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const validationMessage = validateAvatarUrl(avatarUrl);
    setTouched(true);
    setError(validationMessage);

    if (!validationMessage) {
      console.log('Nuevo avatar listo para guardar:', avatarUrl.trim());
    }
  }

  return (
    <form
      className="popup__form"
      id="edit-avatar-form"
      name="edit-avatar-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__field">
        <input
          id="avatar-link"
          className={`popup__input popup__input_type_url ${
            touched && error ? 'popup__input_type_error' : ''
          }`.trim()}
          name="avatar"
          placeholder="Enlace a la imagen"
          value={avatarUrl}
          required
          type="url"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span
          className={`popup__error ${
            touched && error ? 'popup__error_visible' : ''
          }`.trim()}
          id="avatar-link-error"
          style={{ color: '#ff0000' }}
        >
          {touched ? error : ''}
        </span>
      </label>

      <button
        className={`button popup__button ${
          !isFormValid ? 'popup__button_disabled' : ''
        }`.trim()}
        type="submit"
        disabled={!isFormValid}
      >
        Guardar
      </button>
    </form>
  );
}