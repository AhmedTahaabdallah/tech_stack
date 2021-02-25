const typeDefs = `
    type oneMovie {
        title: String!
        year: String!
        imdbID: String!
        movieType: String!
        poster: String!
    }

    type movieDetils {
        title: String
        year: String
        imdbID: String
        movieType: String
        poster: String
        released: String
        runtime: String
        genre: String
        actors: String
        plot: String
        language: String
        country: String
        error: String
    }

    type Query {
        getAllMovies(year: String, page: String): [oneMovie]
        searchByName(keySearch: String, page: String): [oneMovie]
        getMovieDetailsById(movieId: String): movieDetils
    }
`;

module.exports = typeDefs;