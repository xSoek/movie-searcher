import React from "react";
import MovieCard from "../cards/movieCard";
import "./style.css"

const SearchResult = (props) => {
    return (
        <div className="searchList">
            {
                props.searchData.map((movie) => {
                    return (
                        <MovieCard lightMode={props.lightMode} key={movie.id} size={300} image={movie.poster_path} title={movie.title} release_date={movie.release_date} movieId={movie.id} viewMovieInfo={props.viewMovieInfo}/>
                    )
                })
            }
        </div>
    )
    
}

export default SearchResult;