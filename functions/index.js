const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const { ApolloServer, makeExecutableSchema} = require('apollo-server-express');
const serviceAccount = require('./tech-stack-5fc85-firebase-adminsdk-99525-c0f28770fc.json');
const cors = require("cors")({ origin: true });
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const Busboy = require("busboy");

const { getAllMovies} = require('./graphql/movies/getAllMoviess');
const { searchByName} = require('./graphql/movies/searchByName');
const { getMovieDetailsById} = require('./graphql/movies/getMovieDetailsById');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const app = express();
const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
        return {
            req
        };
    },
});

server.applyMiddleware({app, path: '/', cors: true});

const graphqlFileRuntimeOpts = {
    timeoutSeconds: 120,
    memory: '1GB'
};

exports.graphql = functions.runWith(graphqlFileRuntimeOpts).region('europe-west3').https.onRequest(app);

const allApiRuntimeOpts = {
    timeoutSeconds: 120,
    memory: '1GB'
};

exports.getAllMovies = functions.runWith(allApiRuntimeOpts).region('europe-west3').https.onRequest((req, res) => {
    cors(req, res, () => {
        if (req.method !== "POST") {
            return res.status(500).json({
                status: 'notdone',
                message: "Not allowed",
                data: null
            });
        }
        const busboy = new Busboy({ headers: req.headers });
        let year = null;
        let page = null;

        busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated) => {
            if(fieldname === 'year'){
                year = val;
            }
            if(fieldname === 'page'){
                page = val;
            }
        });

        busboy.on("finish", async() => {
            if(year === null || isNaN(year)){
                res.status(500).json({
                    status: 'notdone',
                    message: "year number require!",
                    data: null
                });
                return;
            }
            if(page === null || isNaN(page)){
                res.status(500).json({
                    status: 'notdone',
                    message: "page number require!",
                    data: null
                });
                return;
            }
            const data = await getAllMovies(year, page);
            res.status(200).json({
                status: 'done',
                message: "",
                data: data
            });
        });
        
        busboy.end(req.rawBody);
    });
});

exports.searchByName = functions.runWith(allApiRuntimeOpts).region('europe-west3').https.onRequest((req, res) => {
    cors(req, res, () => {
        if (req.method !== "POST") {
            return res.status(500).json({
                status: 'notdone',
                message: "Not allowed",
                data: null
            });
        }
        const busboy = new Busboy({ headers: req.headers });
        let keySearch = null;
        let page = null;

        busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated) => {
            if(fieldname === 'keySearch'){
                keySearch = val;
            }
            if(fieldname === 'page'){
                page = val;
            }
        });

        busboy.on("finish", async() => {
            if(keySearch === null){
                res.status(500).json({
                    status: 'notdone',
                    message: "keySearch require!",
                    data: null
                });
                return;
            }
            if(page === null || isNaN(page)){
                res.status(500).json({
                    status: 'notdone',
                    message: "page number require!",
                    data: null
                });
            }
            const data = await searchByName(keySearch, page);
            res.status(200).json({
                status: 'done',
                message: "",
                data: data
            });
            return;
        });
        
        busboy.end(req.rawBody);
    });
});

exports.getMovieDetailsById = functions.runWith(allApiRuntimeOpts).region('europe-west3').https.onRequest((req, res) => {
    cors(req, res, () => {
        if (req.method !== "POST") {
            return res.status(500).json({
                status: 'notdone',
                message: "Not allowed",
                data: null
            });
        }
        const busboy = new Busboy({ headers: req.headers });
        let movieId = null;

        busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated) => {
            if(fieldname === 'movieId'){
                movieId = val;
            }
        });

        busboy.on("finish", async() => {
            if(movieId === null || movieId.trim().length === 0){
                res.status(500).json({
                    status: 'notdone',
                    message: "movieId require!",
                    data: null
                });
                return;
            }
            const data = await getMovieDetailsById(movieId, true);
            res.status(200).json({
                status: 'done',
                message: "",
                data: data
            });
        });
        
        busboy.end(req.rawBody);
    });
});