import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import adminReducer from "./Reducers/AdminReducer";
import imgReducer from "./Reducers/imgreducer";
import cartReducer from "./Reducers/cartReducer";
let rootReducer = combineReducers({ adminReducer, imgReducer, cartReducer });

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer", "adminReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
