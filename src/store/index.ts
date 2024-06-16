import { configureStore, Middleware } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk'; // Пример middleware (может быть другой middleware)

import formReducer from './formSlice';

const middleware: Middleware[] = [
  // thunk, // Пример middleware (может быть другой middleware)
  // Другие middleware по необходимости
];

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем проверку на сериализацию
    }).concat(middleware), // Добавляем другие middleware, если есть
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
