import React, {Component} from "react"
import TagCard from "./tags/tag";
import MovieCard from "../cards/movieCard";
import PersonCard from "../cards/personCard";
import ProgressBar from 'react-customizable-progressbar'
import defaultImage from "../../media/images/defaultfilm.png"
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./styles.css"

const StyledMovieInfo = styled.div`
    color: ${props => props.lightMode ? "black":"white"};
    .slick-prev:before,
    .slick-next:before {
        color: ${props => props.lightMode ? "black":"white"};
    }
`;

class MovieData extends Component {
    constructor(props) {
        super(props)

        this.movieInfo = this.props.data[0];
        this.recomendations = this.props.data[1].results;
        this.casting = this.props.data[2].cast;
    }
    render() {
        
        return (
            <StyledMovieInfo lightMode={this.props.lightMode} className="movie-main-container">
                
                <button className="btn-back" onClick={(e) => this.props.closeMovieInfo(e)}> Back to Select Movie</button>
                <div className="movie-poster-container">
                    {
                        this.movieInfo.poster_path === null ? <img className="movie-info-image" src={defaultImage} width="400px" alt="default" /> : <img className="movie-info-image" src={`https://image.tmdb.org/t/p/w500/${this.movieInfo.poster_path}`} width="450px" alt="" /> 
                    }
                    {
                        this.movieInfo.tagline === "" ? <p className="tagline"> No tagline provided</p> : <p className="tagline"> "{this.movieInfo.tagline}"</p> 
                    }
                </div>

               
                <div className="movie-info-container">
                    <div className="movie-info-title">
                        <p id="info-title">
                            {
                               this.movieInfo.title === "" ? 'No title provided' : this.movieInfo.title
                            }
                        </p>
                        <p id="info-release-date">
                            {
                                this.movieInfo.release_date === "" ? 'No released date provided' : `(${this.movieInfo.release_date})`
                            }
                        </p>
                        <div className="movie-tag-container">
                            {
                                this.movieInfo.genres.map(genre => {
                                    return <TagCard key={genre.id} id={genre.id} title={genre.name} />
                                })
                            }
                        </div>
                    </div>
                   
                    <p className="movie-overview">
                        {
                            this.movieInfo.overview === "" ? 'No overview provided' : this.movieInfo.overview 
                        }
                    </p>

                    

                    <div className="movie-casting">
                        { 
                            this.casting.length === 0 ? 
                            <p style={{textAlign:"center"}}>Casting no available</p>
                            : 
                            <div>
                                <p style={{textAlign:"center"}}>CASTING</p>
                                <Slider infinite={true} slidesToShow={3} slidesToScroll={3}  className="slider-casting">
                                    { 
                                        this.casting.map((person, index) => {
                                        
                                            if(person.known_for_department==="Acting" && index <= 14) {
                                                return <PersonCard lightMode={this.props.lightMode} key={person.id} image={person.profile_path} title={person.name} subtitle={person.character} />
                                            }
                                            return ''
                                        })
                                    }
                                </Slider>
           
                            </div>
                        }
                    </div>

                </div>
                <div className="votes-container">
                    <div className="votes">
                        <ProgressBar 

                            progress={this.movieInfo.vote_average*10} 
                            radius={100} 
                            rotate={-90}
                            strokeWidth={15} 
                            strokeColor={`hsl(${this.movieInfo.vote_average*10}, 90%, 50%)` }
                            pointerRadius={5} 
                            pointerStrokeWidth={2} 
                            pointerStrokeColor={`hsl(${this.movieInfo.vote_average*10}, 90%, 50%)` }
                            initialAnimation={true} 
                            trackStrokeColor={"black"}
                            pointerFillColor={"black"}
                            transition="5.0s ease" 
                            trackTransition="0.0s ease" 
                            counterClockwise={true}
                            
                        /> 

                        <div className="numberVotes">
                            <p style={{fontSize:"60px"}}> {this.movieInfo.vote_average} </p>
                            <p className="totalVotes">{this.movieInfo.vote_count} <br /> votes</p>
                        </div>
                    </div>
                    <div className="movie-recommendations-container">

                        <p >
                            {
                                this.recomendations.length > 0 ?  
                                'You will also like these'
                                : 
                                'No similar movies found'
                            }
                        </p>
                        <div>
                           
                            <div className="movie-recommendations">

                                { 
                                    this.recomendations.map((movie, index) => {

                                        if(index <= 1) {
                                            return <MovieCard  lightMode={this.props.lightMode} size={185} key={movie.id} image={movie.poster_path} title={movie.title} release_date={movie.release_date} movieId={movie.id} viewMovieInfo={this.props.viewMovieInfo} />
                                        }
                                        return ''
                                    })
                                }
                            </div>
                        </div> 
                    </div>
                </div>
            </StyledMovieInfo>
        )
    }
}

export default MovieData;