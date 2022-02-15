import React, {Component} from "react";
import Navbar from "./components/Navbar/Navbar"
import SearchTab from "./components/search-tab/SearchTab"
import SearchResult from "./components/searchResults/searchResults"
import Pagination from "./components/pagination/pagination"
import MovieData from "./components/movie/movieInfo";
import LoadingScreen from "./components/loading-screen/loading-screen";
import ErrorScreen from "./components/error-screen/error-screen";
import NoResults from "./components/no-result/no-result";
import "./App.css"

class App extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      searchTerm: '',
      totalResults: 0,
      currentPage: 1,
      isMovieSelected: false,
      isLoading: false,
      isError: false,
      lightMode: true,
      newSearch: false,
    }

    this.apiKey = process.env.REACT_APP_API
  }

  handleSubmit = (e) => {
    this.setState({isLoading: true})
    e.preventDefault();
    console.log("New search term")
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
      .then (response => response.json())
      .then( (fetchedData) => {
        console.log(fetchedData);
        this.setState({data: [...fetchedData.results], totalResults: fetchedData.total_results, newSearch: true, isError: false, isLoading: false, currentPage: 1});
      }).catch(error => {
        this.setState({data: [], totalResults: 0, newSearch: true, isError: true, isLoading: false})
        console.log(error);
      })
  }

  selectMovie = (id) => {  
    this.setState({isMovieSelected: false, isLoading: true, newSearch: false,})
    Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`),
      fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${this.apiKey}&page=1`),
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.apiKey}&language=en-US`)
    ]).then( (responses) => {
        console.log(responses);
        // Get a JSON object from each of the responses
        return Promise.all(responses.map( (response) => {
            return response.json();
        }));
    }).then( (fetchedData) => {
      this.setState({data: fetchedData, isLoading: false, isMovieSelected: true})
    })
  }

  handleChange = (e) => { 
    this.setState({searchTerm: e.target.value, newSearch: false,})
  }

  nextPage = (pageNumber) => {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
    this.setState({newSearch: false})
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&page=${pageNumber}`)
      .then(dataRec => dataRec.json())
      .then(dataRec => {
        this.setState({data: [...dataRec.results], currentPage: pageNumber})
      })
  };

  closeMovieInfo = (e) => {
    this.setState({data: []})
    this.nextPage(this.state.currentPage);
    this.setState({isMovieSelected: false, newSearch: false,});
  }

  changeTheme = () => {
    this.setState({ lightMode: !this.state.lightMode})
  }

  render() {
    const totalPages = Math.ceil(this.state.totalResults / 20);

    if(this.state.isError) {
      return (
         <div className="App">
            <Navbar lightMode={this.state.lightMode} changeTheme={this.changeTheme}/>
            <SearchTab totalResults={this.state.totalResults} lightMode={this.state.lightMode} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
            <ErrorScreen lightMode={this.state.lightMode}/>
         </div>
      )
    } 
    
    if (this.state.isLoading) {
      return (
          <div className="App">
            <Navbar lightMode={this.state.lightMode} changeTheme={this.changeTheme}/>
            <LoadingScreen lightMode={this.state.lightMode}/>
         </div>
      )
    }

    if (this.state.totalResults === 0 && this.state.newSearch) {
      return (
          <div className="App">
            <Navbar lightMode={this.state.lightMode} changeTheme={this.changeTheme}/>
            <SearchTab totalResults={this.state.totalResults} lightMode={this.state.lightMode} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
            <NoResults />
         </div>
      )
    }

    return (
      <div className="App">
        <Navbar lightMode={this.state.lightMode} changeTheme={this.changeTheme}/>
        {
          !this.state.isMovieSelected ? 
            <div>
              <SearchTab totalResults={this.state.totalResults} lightMode={this.state.lightMode} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
              <SearchResult lightMode={this.state.lightMode} searchData={this.state.data} viewMovieInfo={this.selectMovie}/>
              {this.state.totalResults > 20 ? <Pagination lightMode={this.state.lightMode} pages={totalPages} nextPage={this.nextPage} currentPage={this.state.currentPage} resetMultiplier={this.state.newSearch}/> : '' }
            </div>
          :
            <div>
              <MovieData lightMode={this.state.lightMode} closeMovieInfo={this.closeMovieInfo}  data={this.state.data} viewMovieInfo={this.selectMovie}/>
            </div>
        }

      </div>
    );
  }
}
export default App;