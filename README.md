# Bait

`Bait` — это современная digital-платформа на стеке `Next.js + Strapi`.
- `Next.js 16` с App Router, динамическими метаданными и серверными запросами.
- `React 19` + `TypeScript` + `Redux Toolkit`.
- `Strapi 5` как headless CMS для управления контентом.
- Авторизация через Strapi и хранение JWT в защищённом cookie.
- Серверная защита страниц, профиль пользователя и комментарии.


## Описание проекта

Проект состоит из двух основных частей:

1. **Фронтенд** — `frontend/`
   - `Next.js 16.2.10` с App Router
   - `React 19.2.4` + `TypeScript`
   - `SCSS` стили
   - `Redux Toolkit` для управления состоянием
   - `Radix UI`, `Swiper`, `yet-another-react-lightbox`
   - SEO и Open Graph метаданные
   - авторизация и защищённые маршруты

2. **Бэкенд** — `backend/`
   - `Strapi 5.50.1`
   - `SQLite` для локального хранения данных
   - плагины Strapi: SEO, навигация, превью, sitemap, CKEditor и другие
   - API для страниц, курсов, комментариев, меню и пользователей

## Технологии

- Next.js
- React
- TypeScript
- Redux Toolkit
- SCSS
- Strapi
- SQLite
- Radix UI
- Swiper
- HTTP cookie auth

## Что реализовано

- Динамическая загрузка контента из Strapi
- Главная страница с секциями, управляемыми CMS
- Страница профиля пользователя с комментариями
- Авторизация через `api/auth/local` Strapi
- Сохранение JWT в `httpOnly` cookie
- Серверная проверка авторизации через `cookies()`
- SEO и Open Graph
- Тёмная/светлая тема с сохранением в `localStorage`


## Запуск проекта

### 1. Фронтенд

```bash
cd frontend
npm install
npm run dev
```

### 2. Бэкенд

```bash
cd backend
npm install
npm run develop
```

### 3. Переменные окружения

- `NEXT_PUBLIC_BACKEND_URL` — адрес Strapi API, например `http://localhost:1337`
- `NEXT_PUBLIC_SITE_TITLE` — заголовок сайта
- `NEXT_PUBLIC_SITE_URL` — URL фронтенда

### 4. Проверка

- Откройте `http://localhost:3000`
- Проверьте работу входа и профиля
- Убедитесь, что данные подтягиваются из Strapi

## Структура репозитория

- `frontend/` — Next.js приложение
- `backend/` — Strapi CMS
- `frontend/src/app/` — маршруты App Router
- `frontend/src/api/` — запросы к CMS
- `frontend/src/redux/` — Redux store
- `frontend/src/components/` — компоненты UI
- `frontend/src/styles/` — SCSS стили