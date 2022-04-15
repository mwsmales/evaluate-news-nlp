// initialize project data
const projectData = {data: []};

function sendKey (req, res) {
    console.log('API key request received')
    res.send(`{"key": "${process.env.API_KEY}"}`)
}

function logData(req, res) {
    console.log("Data received: ", req.body);
    projectData['data'].push(req.body);
    console.log("Project data: ", projectData);
    res.send(JSON.stringify('POST received'));
}

module.exports = {
    sendKey,
    logData
};