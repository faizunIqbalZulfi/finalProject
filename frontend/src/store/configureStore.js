import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/user";
import addressReducer from "./reducers/address";
import productReducer from "./reducers/product";

const rootReducer = combineReducers({
  user: userReducer,
  address: addressReducer,
  product: productReducer
});

const configureReducer = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureReducer;
