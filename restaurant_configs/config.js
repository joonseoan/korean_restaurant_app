console.log('starting config.js');

const env = process.env.NODE_ENV || 'development';

console.log('process.env.*****', env);

if (env === 'production') {

    process.env.MONGODB_URI = require('./prod');
    
} else if (env === 'development') {

    process.env.PORT = 4500;
    process.env.MONGODB_URI = require('./dev');

} else if (env === 'test') {

    process.env.PORT = 4500; 
    process.env.MONGODB_URI = 'mongodb://localhost:27017/guestsTest';

}