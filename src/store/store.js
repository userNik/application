import { createStore } from "redux"
import { setDimensions } from "./reducers";

const  store = createStore(setDimensions);

export default store;
