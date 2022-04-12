// enclosing async function to execute the async functions once the main button is submitted
async function handleSubmit(event) {
    event.preventDefault();
    
    // TODO: check that some text has been entered into the field, and if not show user an error

    // Initialize local variables
    const paragraph = document.getElementById('inputPara').value;
    const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1'; 

    // Get the API key from the BE
    const APIKey = await handleSubmitGetApi('http://localhost:8081/getAPIKey');
    
    // Execute web api call to meaningcloud with the form data and api key
    const sentiment = await meaningCloudGet(baseUrl, APIKey, paragraph);
    console.log('MeaningClound response: ', sentiment)
    
    // post the data received from meaningcloud to the BE
    await postSentiment(paragraph, sentiment);
    
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

async function postSentiment(formText, sentiment) {
    // submits the user's paragraph data to the backend
    
    const postData = {"paragraph": formText, "sentiment": sentiment};

    console.log('Posting data: ', postData);
    const response = await fetch('http://localhost:8081/submitText', {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },    
        // Body data type must match "Content-Type" header
        body: JSON.stringify(postData),
    })
    try { 
        // wait to get a non-error response from the server, then exit the function
       const responseData = await response.json(); 
       console.log("post response: ", responseData);
    } catch(error) {
        console.log("error: ", error);
    }    
}

export { 
    handleSubmitGetApi, 
    postSentiment,
    handleSubmit, 
    meaningCloudGet
}
