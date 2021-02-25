const { getAllMovies} = require('./movies/getAllMoviess');
const { searchByName} = require('./movies/searchByName');
const { getMovieDetailsById} = require('./movies/getMovieDetailsById');

const resolvers = {
    Query: {
        getAllMovies: async(_, {year, page}, { req }) => {
            //console.log('accept-language : ', req.headers['accept-language']);
            //console.log('Authorization : ', req.headers['authorization']);
            //console.log('headers : ', req.headers);
            const data = await getAllMovies(year, page);
            return data;
        },   
        searchByName: async(_, {keySearch, page}, { req }) => {
            const data = await searchByName(keySearch, page);
            return data;
        },     
        getMovieDetailsById: async(_, {movieId}, { req }) => {
            const data = await getMovieDetailsById(movieId, false);
            // if(data.error){
            //     console.log('data.error : ', data.error);
            //     return data.error;
            // } else {
                return data;
            //}            
        },    
    },
};

module.exports = resolvers;