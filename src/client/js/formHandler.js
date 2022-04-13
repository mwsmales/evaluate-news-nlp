import { checkFormInput } from "./nameChecker";

// enclosing async function to execute the async functions once the main button is submitted
async function handleSubmit(event) {
    event.preventDefault();
    
    // Initialize local variables
    const paragraph = document.getElementById('inputPara').value;
    // const paragraph = 'For most gardeners, stones – along with slugs, blackfly and weeds – are a pest, something to be eradicated. Yet in Japan, some of the most astonishing gardens consist of nothing but rocks and stones. As 19th-Century writer Lafcadio Hearn wrote: "to comprehend the beauty of a Japanese garden, it is necessary to understand the beauty of stones."';
    const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1'; 
    
    // TODO: check that some text has been entered into the field, and if not show user an error
    if (checkFormInput(paragraph) == false) {
        return;
    } 

    // Get the API key from the BE
    const APIKey = await handleSubmitGetApi('http://localhost:8081/getAPIKey');
    
    // Execute web api call to meaningcloud with the form data and api key
    const sentiment = await meaningCloudGet(baseUrl, APIKey, paragraph);
    /* 
    const sentiment = {
        "agreement": "DISAGREEMENT",
        "confidence": "92",
        "irony": "NONIRONIC",
        "score_tag": "P",
        "subjectivity": "OBJECTIVE"
    };
    */

    // append the para to the sentiment before logging with server
    sentiment.text = paragraph 
    console.log('MeaningClound response: ', sentiment)
    
    // post the data received from meaningcloud to the BE
    await postSentiment(sentiment);
    
    // TODO: update the UI
    updateUI(sentiment);
    
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

async function postSentiment(sentiment) {
    // submits the user's paragraph data to the backend
    
    console.log('Posting data: ', sentiment);
    const response = await fetch('http://localhost:8081/submitText', {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },    
        // Body data type must match "Content-Type" header
        body: JSON.stringify(sentiment),
    })
    try { 
        // wait to get a non-error response from the server, then exit the function
       const responseData = await response.json(); 
       console.log("post response: ", responseData);
    } catch(error) {
        console.log("error: ", error);
    }    
}

function updateUI(sentiment) {
    console.log('Updating UI...');

    const resultsDiv = document.getElementById('results');
    const fragment = document.createDocumentFragment();
    
    // remove all children from the 'results' div
    while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.lastChild);
    }

    // add sentiment values
    for (let key in sentiment) {
        // add the key as the category heading
        const newHeadingDiv = document.createElement('div');
        newHeadingDiv.classList += 'headingDiv';
        newHeadingDiv.innerHTML = `<p>${key}</p>`;
        // add the value as the body 
        const newBodyDiv = document.createElement('div');
        newBodyDiv.classList += 'bodyDiv';
        newBodyDiv.innerHTML = `<p>${sentiment[key]}</p>`;
        fragment.append(newHeadingDiv);
        fragment.append(newBodyDiv);
    }
    resultsDiv.append(fragment);
    console.log('UI updated')
}

export { 
    handleSubmitGetApi,
    checkFormInput,
    postSentiment,
    handleSubmit, 
    meaningCloudGet, 
    updateUI
}
