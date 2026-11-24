
# Around The U.S. (React + TypeScript)

Aplicación web interactiva desarrollada con **React**, **TypeScript** y **Vite** para explorar tarjetas de lugares, gestionar el perfil de usuario y abrir ventanas modales (*popups*) con validación de formularios en tiempo real.

## Enlaces del proyecto

* **Repositorio en GitHub:** `https://github.com/akikosato81-maker/web_project_around_react.git` 

## Funcionalidades

* **Galería de tarjetas (`Card` y `Main`):**
  * Renderizado dinámico de tarjetas iniciales con título, imagen y estado de "me gusta".
  * Alternar estado activo/inactivo en el botón de "me gusta".
  * Flujo de eliminación de tarjetas con modal de confirmación.
* **Sistema de ventanas modales (`Popup`):**
  * Apertura dinámica mediante configuración de título y contenido hijo (`PopupConfig`).
  * Cierre desde el botón de cerrar, haciendo clic sobre el fondo oscuro (*overlay*) o presionando la tecla `Escape`.
* **Formularios y validación:**
  * **Editar perfil (`EditProfile`):** Validación de nombre (2 a 40 caracteres) y descripción/acerca de mí (2 a 200 caracteres), manejo de campos tocados (*touched*) y bloqueo del botón de envío hasta que el formulario sea válido.
  * **Cambiar foto de perfil (`EditAvatar`):** Validación de URL con protocolo `http:` o `https:` y retroalimentación visual de errores.
  * **Nuevo lugar (`NewCard`):** Validación de título (2 a 30 caracteres) y enlace de imagen (`http:` / `https:`) con control de envío.
  * **Vista ampliada de imagen (`ImagePopup`):** Visualización de la fotografía seleccionada junto con su pie de foto.
* **Estructura de página (`Header`, `Main`, `Footer`):**
  * Encabezado con logotipo, sección principal con perfil y tarjetas, y pie de página con créditos.

## Stack tecnológico

* **Lenguaje:** TypeScript
* **Biblioteca UI:** React
* **Empaquetador y servidor de desarrollo:** Vite
* **Estilos:** CSS3 modular siguiendo la metodología **BEM**
* **Calidad de código:** ESLint

## Estructura del proyecto

```text
web_project_around_react/
├── public/
├── src/
│   ├── assets/
│   ├── blocks/
│   ├── components/
│   │   ├── Footer/
│   │   │   └── Footer.tsx
│   │   ├── Header/
│   │   │   └── Header.tsx
│   │   ├── Main/
│   │   │   ├── Card/
│   │   │   │   └── Card.tsx
│   │   │   ├── Popup/
│   │   │   │   ├── EditAvatar/
│   │   │   │   │   └── EditAvatar.tsx
│   │   │   │   ├── EditProfile/
│   │   │   │   │   └── EditProfile.tsx
│   │   │   │   ├── ImagePopup/
│   │   │   │   │   └── ImagePopup.tsx
│   │   │   │   ├── NewCard/
│   │   │   │   │   └── NewCard.tsx
│   │   │   │   └── Popup.tsx
│   │   │   └── Main.tsx
│   │   └── App.tsx
│   ├── images/
│   ├── types/
│   │   └── types.ts
│   ├── vendor/
│   │   └── fonts
│   │   └── fonts.css
│   │   └── normalize.css
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md