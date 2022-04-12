// enclosing async function to execute the async functions once the main button is submitted
async function handleSubmit(event) {
    event.preventDefault();
    
    // Declare local variables
    const paragraph = document.getElementById('inputPara').value;
    const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1'; 

    // Get the API key from the BE
    const APIKey = await handleSubmitGetApi('http://localhost:8081/getAPIKey');
    
    // Execute web api call to meaningcloud with the form data and api key
    const sentiment = await meaningCloudGet(baseUrl, APIKey, paragraph);
    console.log('MeaningClound response: ', sentiment)
    
    // TODO: post the data received from meaningcloud to the BE
    // await handleSubmitPOST();
    // console.log(projectData);
    
    // TODO: update the UI
    
}

// async get function to test server get route
async function handleSubmitGetApi(url = '') {
    console.log('Fetching API key from server');
    const response = await fetch(url, {
        method: 'GET', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    try {
        const data = await response.json();
        console.log("API key received");
        return(data.key);
    } catch(error) {
        console.log("error fetching API key: ", error);
    }
}

async function handleSubmitPOST() {
    // submits the user's paragraph data to the backend

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    Client.checkForName(formText);
    
    console.log('Posting data: ', formText);
    const response = await fetch('http://localhost:8081/submitText', {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },    
        // Body data type must match "Content-Type" header
        body: JSON.stringify({newEntry: formText}),
    })
    try { 
        // wait to get a non-error response from the server, then exit the function
       const responseData = await response.json(); 
       console.log("post response: ", responseData);
    } catch(error) {
        console.log("error: ", error);
    }    
}

async function meaningCloudGet (baseUrl = '', apiKey = '', paragraph = '') {
    console.log ('Making MeaningCloud reqeust...');
    console.log('meaningcloud url: ', `${baseUrl}?key=${apiKey}&lang=auto&txt=${paragraph}`)
    const response = await fetch(`${baseUrl}?key=${apiKey}&lang=auto&txt=${paragraph}`);
    try {
        return response.json();
    }
    catch {
        console.log('Meaningcloud API erorr: ', error);
    }
}

export { 
    handleSubmitGetApi, 
    handleSubmitPOST,
    handleSubmit, 
    meaningCloudGet
}
