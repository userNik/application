import React from "react";
import MoviePlate from "../MoviePlate";
import NoData from "../NoData";

import "./MovieCatalog.scss";

const MovieCatalog = ({ items }) => {
    if (!items.length) {
        return <NoData />;
    }

    return (
        <div className="movie-box">
            {
                items.map(({ Poster, Title, imdbID }) =>
                    <MoviePlate
                        key={ imdbID }
                        id={ imdbID }
                        poster={ Poster }
                        title={ Title }
                    />)
            }
        </div>
    )
};

export default MovieCatalog;
