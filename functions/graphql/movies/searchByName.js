const fetch = require('node-fetch');

exports.searchByName = async function searchByName(keySearch, page) {
    console.log('welcome');
    const data = [];
    try{
        const res = await fetch(`http://www.omdbapi.com/?apikey=b7e897a3&type=movie&s=${keySearch}&page=${page}`);
        const movies = await res.json();
        //console.log('movies : ', movies);
        if(movies.Response === 'True') {            
            const list = [...movies.Search];            
            list.forEach((movie, index) => {
                //console.log('movie : ', index, movie);
                data.push({
                    'title': movie.Title,
                    'year': movie.Year,
                    'imdbID': movie.imdbID,
                    'movieType': movie.Type,
                    'poster': movie.Poster,
                });
                if(list.length - 1 === index) {
                    return data;
                }
            });            
        }
        return data;
    } catch(err) {
        console.log(err);
        return [];
    }
}