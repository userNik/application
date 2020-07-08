import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk"
import movies from "../reducers/movies";

export default createStore(movies, applyMiddleware(thunkMiddleware));
