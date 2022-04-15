var path = require('path');
const routeFunctions = require('./routeFunctions');

// require dotenv so that we can use environmental variables
const dotenv = require('dotenv');
dotenv.config();

// initialize app
const express = require('express');
const app = express();

/* depdendencies */
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//refer local server to /dist/ files 
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// initialize server on port 8081
const port = 8081;
app.listen(port, function () {
    console.log('Example app listening on port 8081!')
})

// Get request to return API key
app.get('/getAPIKey', routeFunctions.sendKey);

// post request to log app data
app.post('/submitText', routeFunctions.logData);

