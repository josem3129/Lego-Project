const dotenv = require('dotenv').config()
const MongoClient = require('mongodb').MongoClient

let database;

const initDbLego = (callback) => {
    console.log(`try ${callback}`)
    if (database) {
        console.log('Db is already running!');
        return callback(null, database)
    }
    MongoClient
    .connect(process.env.MONGODB_URI_LEGO)
    .then((client) => {
        database = client;
        callback(null, database)
    });
}
const initDbUser = (callback) => {
    if (database) {
        console.log('Db is already running!');
        return callback(null, database)
    }
    MongoClient.connect(process.env.MONGODB_URI_USER)
    .then((client) => {
        database = client;
        callback(null, database)
    });
}
const getDb = () => {
    if (!database) {
        throw Error('Db not started')
    }
    return database
};

module.exports = {
    initDbLego,
    initDbUser,
    getDb,
  };