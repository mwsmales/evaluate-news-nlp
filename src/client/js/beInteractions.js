// async get function to test server get route
async function getApiKey(url = '') {
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

export {
    getApiKey,
    postSentiment,
}