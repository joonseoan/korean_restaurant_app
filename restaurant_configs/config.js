console.log('starting config.js');

const { MongoURI } = require('./keys');

const env = process.env.NODE_ENV || 'development';

console.log('process.env.*****', env);

if (env === 'production') {

    process.env.MONGODB_URI = MongoURI;
    
} else if (env === 'development') {


    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/guests';

} else if (env === 'test') {

    process.env.PORT = 3000; // || process.argv[2];
    process.env.MONGODB_URI = `mongodb://localhost:27017/guestsTest`;

}