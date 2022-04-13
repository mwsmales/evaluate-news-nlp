import { checkFormInput } from "./formChecker";
import { getApiKey } from "./beInteractions";
import { postSentiment } from "./beInteractions";
import { meaningCloudGet} from "./meaningCloudInteractions"

// enclosing async function to execute the async functions once the main button is submitted
async function handleSubmit(event) {
    event.preventDefault();
    
    // Initialize local variables
    const paragraph = document.getElementById('inputPara').value;
    const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1'; 
    // const paragraph = 'For most gardeners, stones – along with slugs, blackfly and weeds – are a pest, something to be eradicated. Yet in Japan, some of the most astonishing gardens consist of nothing but rocks and stones. As 19th-Century writer Lafcadio Hearn wrote: "to comprehend the beauty of a Japanese garden, it is necessary to understand the beauty of stones."';
    
    // TODO: check that some text has been entered into the field, and if not show user an error
    if (checkFormInput(paragraph) == false) {
        return;
    } 

    // Get the API key from the BE
    const APIKey = await getApiKey('http://localhost:8081/getAPIKey');
    
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
    getApiKey,
    checkFormInput,
    postSentiment,
    handleSubmit, 
    meaningCloudGet, 
    updateUI
}
