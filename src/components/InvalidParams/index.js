import React from "react";
import "./InvalidParams.scss";

const InvalidParams = () => {
    return (
        <figure className="invalid-params">
            <img
                className="invalid-params__image"
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                alt="Invalid ImdbId"/>
            <figcaption className="invalid-params">Invalid ImdbId</figcaption>
        </figure>
    )
};

export default InvalidParams;
