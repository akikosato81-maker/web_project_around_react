import type React from 'react';
import { useState } from 'react';

type FormErrors = {
  name: string;
  description: string;
};

export default function EditProfile(): React.JSX.Element {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    description: '',
  });
  const [touched, setTouched] = useState<{
    name: boolean;
    description: boolean;
  }>({
    name: false,
    description: false,
  });

  function validateField(
    fieldName: 'name' | 'description',
    value: string
  ): string {
    const trimmed = value.trim();

    if (!trimmed) {
      return 'Completa este campo';
    }

    if (trimmed.length < 2) {
      const count = trimmed.length;
      const word = count === 1 ? 'carácter' : 'caracteres';
      return `Extiende este texto para que tenga 2 caracteres o más (actualmente usas ${count} ${word}).`;
    }

    if (fieldName === 'name' && trimmed.length > 40) {
      return 'Acorta este texto a 40 caracteres o menos.';
    }

    if (fieldName === 'description' && trimmed.length > 200) {
      return 'Acorta este texto a 200 caracteres o menos.';
    }

    return '';
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setName(value);
    setTouched((prev) => ({ ...prev, name: true }));
    setErrors((prev) => ({
      ...prev,
      name: validateField('name', value),
    }));
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setDescription(value);
    setTouched((prev) => ({ ...prev, description: true }));
    setErrors((prev) => ({
      ...prev,
      description: validateField('description', value),
    }));
  }

  function handleBlur(fieldName: 'name' | 'description'): void {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const currentValue = fieldName === 'name' ? name : description;
    setErrors((prev) => ({
      ...prev,
      [fieldName]: validateField(fieldName, currentValue),
    }));
  }

  const isNameValid = validateField('name', name) === '';
  const isDescriptionValid = validateField('description', description) === '';
  const isFormValid = isNameValid && isDescriptionValid;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const nameError = validateField('name', name);
    const descriptionError = validateField('description', description);

    setTouched({ name: true, description: true });
    setErrors({ name: nameError, description: descriptionError });

    if (!nameError && !descriptionError) {
      console.log('Perfil listo para guardar:', {
        name: name.trim(),
        description: description.trim(),
      });
    }
  }

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      name="edit-profile-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__field">
        <input
          id="profile-name"
          className={`popup__input popup__input_type_name ${
            touched.name && errors.name ? 'popup__input_type_error' : ''
          }`.trim()}
          name="name"
          placeholder="Nombre"
          value={name}
          minLength={2}
          maxLength={40}
          required
          type="text"
          onChange={handleNameChange}
          onBlur={() => handleBlur('name')}
        />
        <span
          className={`popup__error ${
            touched.name && errors.name ? 'popup__error_visible' : ''
          }`.trim()}
          id="profile-name-error"
          style={{ color: '#ff0000' }}
        >
          {touched.name ? errors.name : ''}
        </span>
      </label>

      <label className="popup__field">
        <input
          id="profile-description"
          className={`popup__input popup__input_type_description ${
            touched.description && errors.description
              ? 'popup__input_type_error'
              : ''
          }`.trim()}
          name="description"
          placeholder="Acerca de mí"
          value={description}
          minLength={2}
          maxLength={200}
          required
          type="text"
          onChange={handleDescriptionChange}
          onBlur={() => handleBlur('description')}
        />
        <span
          className={`popup__error ${
            touched.description && errors.description ? 'popup__error_visible' : ''
          }`.trim()}
          id="profile-description-error"
          style={{ color: '#ff0000' }}
        >
          {touched.description ? errors.description : ''}
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