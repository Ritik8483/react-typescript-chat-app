import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "../redux/rootReducer";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["authSlice"], //things to be persisted
  blacklist: ["googleInfoSlice"], //not persisted things
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      //   serializableCheck:false
    }),
});
export const persistor = persistStore(store);

export default store;
