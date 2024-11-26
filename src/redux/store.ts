import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer,persistStore } from "redux-persist";
import orebiReducer from './orebiSlices';






const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: 0
}

const persistedReducer = persistReducer(persistConfig, orebiReducer);

export const store = configureStore({
    reducer: { orebi: persistedReducer },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }),
    
})


export const persistor = persistStore(store);

export const getDispatch = () => {
    return store.dispatch;
};
