import React from "react";
import MoviePlate from "../MoviePlate";
import NoData from "../NoData";

import "./MovieCatalog.scss";

const MovieCatalog = ({ items }) => {
    const count = items.length;

    if (!count) {
        return <NoData />;
    }
    const className = count < 5 ? "movie-box movie-box_no-stretch" : "movie-box";

    return (
        <div className={className}>
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
