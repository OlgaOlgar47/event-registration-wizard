import { configureStore, Middleware } from '@reduxjs/toolkit';

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
      serializableCheck: false,
    }).concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
