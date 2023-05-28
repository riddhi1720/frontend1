import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ReviewForm from '../../reviewForm/ReviewForm';
import axios from 'axios';
import { GetAppBaseUrl } from '../../utils/Util';


class ReviewComponent extends Component {
    state = {
        movie: {
            reviews: []
        }
    }

    constructor(props) {
        super(props);
        this.AddReview = this.AddReview.bind(this);
        this.GetMovieData = this.GetMovieData.bind(this);
        this.SetReviews = this.SetReviews.bind(this);
        this.movieId = "tt3915174";
    }

    componentDidMount() {
        this.GetMovieData(this.movieId);
    }

    GetMovieData = async (movieId) => {
        try {
            const response = await axios.get(GetAppBaseUrl() + "/api/v1/movies/" + movieId);
            const singleMovie = response.data;
            this.setState({
                movie: singleMovie
            });
        } catch (error) {
            console.error(error);
        }
    };

    SetReviews(review) {
        let localMovie = this.state.movie;
        localMovie.reviews.push(review);
        this.setState({
            movie: localMovie
        });
    }

    AddReview = (e) =>{
        e.preventDefault();

        const response = axios.post(GetAppBaseUrl() + "/api/v1/reviews", {
            reviewBody: e.target.review.value,
            imdbId: this.movieId
        }).then(response => {
            this.SetReviews(response.data);
        });
        return false;
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col><h3>Reviews</h3></Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <img src={this.state.movie.poster} alt="" />
                    </Col>
                    <Col>
                        {
                            <>
                                <Row>
                                    <Col>
                                        <ReviewForm handleSubmit={this.AddReview} />  
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </>
                        }
                        {
                            this.state.movie.reviews?.map((r, index) => {
                                return(
                                    <Row key={"review_" + index} style={{borderBottom: "1px solid grey", padding: "8px"}}>
                                        <Col>{r.body}</Col>
                                    </Row>
                                )
                            })
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr />
                    </Col>
                </Row>        
            </Container>
          )        
    }
}

export default ReviewComponent;