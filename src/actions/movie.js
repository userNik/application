import { baseUrl} from "../configs/common";
import {ADD_MOVIE, CLEAR_LIST} from "./keys";

const updateList = (data) => ({ type: ADD_MOVIE, data });

export const fetchMovies = (query = "") => {
  return (dispatch) => {
      return fetch(`${baseUrl}&s=${query}&type=movie`, {
          method: "GET"
      })
          .then(response => response.json())
          .then(({ Response, Search }) => {
              dispatch(Response === "True" ? updateList(Search) : { type: CLEAR_LIST });
          });
  }
};

export const getMovieById = (imdbId) => {
    return () => {
        return fetch(`${baseUrl}&i=${imdbId}`, {
            method: "GET"
        })
            .then(response => response.json());
    }
};
