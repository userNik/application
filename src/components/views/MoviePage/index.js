import React, {useEffect, useState} from "react";
import InvalidParams from "../../InvalidParams";
import PlateWaiter from "../../PlateWaiter";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMovieById } from "../../../actions/movie";
import { moviesStore } from "../../../configs/common";
import { isValidImdbId, mapMovieDetails, isNAPoster } from "../../../utils/common";
import "./MoviePage.scss"

const MoviePage = (props) => {
    const dispatch = useDispatch();
    const [isError, setError] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const [posterUrl, setPosterUrl] = useState(null);
    const {id} = useParams();
    const goBack = () => {
        props.history.goBack();
    };

    useEffect(() => {
        if (!isValidImdbId(id)) {
            setError(true);
            return;
        }

        dispatch(getMovieById(id))
            .then((details) => {
                const movieValues = [
                    "Title",
                    "Actors",
                    "Director",
                    "Plop",
                    "Production",
                    "Released",
                    "Writer",
                    "Year",
                    "imdbRating"
                ];
                setMovieDetails(mapMovieDetails(details, movieValues));
                setPosterUrl(
                    isNAPoster(details.Poster) ?
                        moviesStore.get("defaultPoster") :
                        details.Poster
                );
            })
            .catch(() => {
                setError(true);
            });
    }, [id]);

    return (
        <section className="movie-page">
            <div className="movie-page__top">
                <button
                    className="movie-page__back"
                    onClick={goBack}
                >Back
                </button>
            </div>
            <div className="movie-page__info">
                { isError && <InvalidParams /> }
                { !movieDetails.length && <PlateWaiter /> }
                {
                    movieDetails.map(({title, value}) => (
                        <span key={title} className="movie-page__item">
                            <span className="movie-page__item-title">{title}</span>
                            <span className="movie-page__item-value">{value}</span>
                        </span>
                    ))
                }
            </div>
            <div className="movie-page__poster">
                {posterUrl && <img src={posterUrl} alt="Movie poster"/>}
            </div>
        </section>
    );
};

export default MoviePage;
