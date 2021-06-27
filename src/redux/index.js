import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducers';
// import { persistStore } from 'redux-persist';

let middleware = getDefaultMiddleware();
//DEV

const store = configureStore({reducer});
console.log('store ',store.getState());

// export const persistor = persistStore(store);

export default store;
