import React from "react";
import { useStore, useSelector } from "react-redux";
import SearchBar from "../../SearchBar";
import MovieCatalog from "../../MovieCatalog";
import { fetchMovies } from "../../../actions/movie";

import "./Intro.scss";

const Intro = () => {
    const { dispatch } = useStore();
    const items = useSelector((state) => state.list);
    const subscriber = (query) => {
        dispatch(fetchMovies(query))
    };

    return (
        <div className="intro">
            <SearchBar subsriber={subscriber} />
            <hr className="intro__hr" />
            <MovieCatalog items={items} />
        </div>
    );
};

export default Intro;
