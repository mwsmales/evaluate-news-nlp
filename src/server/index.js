var path = require('path')
const mockAPIResponse = require('./mockAPI.js')

// initialize project data
const projectData = {data: []};

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
    // res.sendFile(path.resolve('src/client/views/index.html'))
});

// initialize server on port 8081
const port = 8081;
app.listen(port, function () {
    console.log('Example app listening on port 8081!')
});

// post request for app data
app.post('/addEntry', function(req, res) {
    res.send(JSON.stringify('POST received'));
    console.log("Data received: ", req.body);
    projectData['data'].push(req.body);
    console.log("Project data: ", projectData);
});

// get request for app data
app.get('/getData', function (req, res) {
    console.log('Get request received')
    res.send(mockAPIResponse)
});
