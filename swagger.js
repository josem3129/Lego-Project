const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Lego api',
        description: 'lego sets I own API'
    },
    host: 'lego-project.onrender.com',
    schemes: ['https']
    
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)