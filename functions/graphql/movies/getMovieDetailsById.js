const fetch = require('node-fetch');

exports.getMovieDetailsById = async function getMovieDetailsById(movieId, isApi) {
    console.log('welcome');
    let oneMovie = {
        title: '',
        year: '',
        imdbID: '',
        movieType: '',
        poster: '',
        released: '',
        runtime: '',
        genre: '',
        actors: '',
        plot: '',
        language: '',
        country: ''
    };  
    try{
        const res = await fetch(`http://www.omdbapi.com/?apikey=b7e897a3&i=${movieId}`);
        const movie = await res.json();
        if(movie.Response === 'True') {    
            oneMovie.title = movie.Title;
            oneMovie.year = movie.Year;
            oneMovie.imdbID = movie.imdbID;
            oneMovie.movieType = movie.Type;
            oneMovie.poster = movie.Poster;
            oneMovie.released = movie.Released;
            oneMovie.runtime = movie.Runtime;
            oneMovie.genre = movie.Genre;
            oneMovie.actors = movie.Actors;
            oneMovie.plot = movie.Plot;
            oneMovie.language = movie.Language;
            oneMovie.country = movie.Country;
        } else {
            if(isApi) {
                return {
                    error: movie.Error
                }
            } else {
                oneMovie.error = movie.Error;
            }            
        }
        return oneMovie;
    } catch(err) {
        console.log(err);
        return [];
    }
}