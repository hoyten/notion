import { combineReducers, createStore, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"
import persistReducer from "redux-persist/es/persistReducer"
import persistStore from "redux-persist/es/persistStore"
import storage from "redux-persist/lib/storage"
import { userReducer } from "./user/reducer"
import { noteReducer } from "./notes/reducer"

const rootReducer = combineReducers({
    user: userReducer,
    note: noteReducer
})

const persistReducers = persistReducer(
    {
        key: "root", storage, whitelist: ['user', 'note']
    }, rootReducer
)

const store = createStore(
    persistReducers,
    window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.(applyMiddleware(thunk))
)

export default store
export const persistor = persistStore(store)