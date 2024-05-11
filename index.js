const express = require('express');
const bodyParser = require('body-parser')
const mongodb = require('./data/dataBase')
const routes = require('./routes')

const port = process.env.PORT || 8080;
const app = express();

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', routes)

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `uncaught exception ${err}\n exception origin ${origin}`)
})    


mongodb.initDbLego((err) => {
    if (err) {
        console.log(err);
    } 
})

mongodb.initDbUser((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`running on port ${port}`)});        
    }
})