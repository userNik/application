import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getBase64Image, isNAPoster } from "../../utils/common";
import PlateThumb from "../PlateThumb";
import { moviesStore } from "../../configs/common";
import "./MoviePlate.scss";

const MoviePlate = ({ id, title, poster }) => {
    const [imageSource, setImageSource] = useState(null);
    useEffect(() => {
        if (isNAPoster(poster)) {
            setImageSource(moviesStore.get("defaultPoster"));
            return;
        }

        if (moviesStore.has(id)) {
            setImageSource(moviesStore.get(id));
            return;
        }

        getBase64Image(poster).then((source) => {
            moviesStore.set(id, source);
            setImageSource(source);
        }).catch(() => {
            setImageSource(moviesStore.get("defaultPoster"));
        });
    }, [id, poster, title]);

    return (
        <Link to={ "/" + id } className="plate">
           <span className="plate__thumb">
                    <PlateThumb source={ imageSource } />
                </span>
            <span className="plate__desc">{ title }</span>
        </Link>
    )
};

export default MoviePlate;
