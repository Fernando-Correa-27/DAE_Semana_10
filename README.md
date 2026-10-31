# 🎬 Cartelera de Cine

Proyecto académico de ReactJS — DAE Semana 9

## Tecnologías

- **Vite** — Herramienta de build moderna y rápida
- **React 19** — Biblioteca UI con componentes funcionales y hooks
- **prop-types** — Validación de props en tiempo de ejecución
- **CSS nativo** — Variables CSS (Custom Properties), BEM naming, diseño responsive mobile-first

## Características

- **8 películas** con datos ficticios (póster SVG local, sinéopsis, clasificación etaria, puntuación y horarios)
- **Película destacada** (Hero) con fondo visual y badges informativos
- **Cartelera responsive** — grid adaptativo que colapsa a una columna en móvil
- **Tema oscuro** con variables CSS reutilizables
- **Accesibilidad** — HTML semántico, atributos ARIA, `focus-visible`, `alt` en imágenes

## Arquitectura

```
src/
├── assets/          → Pósteres SVG locales (movie1.svg – movie8.svg)
├── components/      → Componentes con BEM CSS
│   ├── Header/      → Barra de navegación sticky
│   ├── Footer/      → Pie de página con copyright
│   ├── Hero/        → Sección de película destacada
│   ├── MovieCard/   → Tarjeta individual de película
│   └── MovieList/   → Grid de películas (excluye destacada)
├── data/
│   └── cartelera.js → Datos de 8 películas
├── styles/
│   ├── reset.css    → Normalización CSS
│   ├── variables.css → Tokens de diseño (colores, espaciado, tipografía)
│   ├── base.css     → Estilos globales del body
│   └── component-overrides.css → Layout del App y @import de componentes
├── App.jsx          → Composición principal (Header + Hero + MovieList + Footer)
└── main.jsx         → Entry point de React
```

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Errores demostrados (Paso 11)

Este proyecto demuestra tres errores comunes de React y sus correcciones:

1. **`class` vs `className`** — React usa `className` en lugar de `class` en JSX porque `class` es una palabra reservada de JavaScript.
2. **Múltiples nodos raíz sin wrapper** — Un componente React debe retornar un único nodo. Se soluciona con un `<div>` wrapper o un Fragment `<>...</>`.
3. **Prop `key` faltante** — Al mapear un array de elementos en React, cada hijo necesita una `key` única para que React pueda hacer diff eficiente del DOM.

## Autor

Fernando Correa Huincho — Fernando-Correa-27
