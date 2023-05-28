import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { GetAppBaseUrl } from '../utils/Util';

import "./Hero.css";


class MoviesComponent extends Component {

    state = {
        movies: []
    }

    constructor(props) {
        super(props);
        this.GetMovies = this.GetMovies.bind(this);
    }

    componentDidMount() {
        this.GetMovies();
    }
 
    GetMovies = async () => {
        try {
            const response = await axios.get(GetAppBaseUrl() + '/api/v1/movies');
            this.setState({ movies: response.data });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div className ='movie-carousel-container'>
            <Carousel>
                {
                    this.state.movies?.map((movie) =>{
                        return(
                            <Paper key={movie.imdbId}>
                                <div className = 'movie-card-container'>
                                    <div className="movie-card" style={{"--img": `url(${movie.backdrops[0]})`}}>
                                        <div className="movie-detail">
                                            <div className="movie-poster">
                                                <img src={movie.poster} alt="" />
                                            </div>
                                            <div className="movie-title">
                                                <h4>{movie.title}</h4>
                                            </div>
                                            <div className="movie-buttons-container">
                                                <Link to={`/trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                                    <div className="play-button-icon-container">
                                                        <FontAwesomeIcon className="play-button-icon"
                                                            icon = {faCirclePlay}
                                                        />
                                                    </div>
                                                </Link>

                                                <div className="movie-review-button-container">
                                                    <Button variant ="info" as={Link} to={"/reviews/" + movie.imdbId} >Reviews</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        )
                    })
                }
            </Carousel>
    </div>
        );
    }
}

export default MoviesComponent;