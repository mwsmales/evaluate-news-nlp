// enclosing async function to execute the async functions once the main button is submitted
async function handleSubmit(event) {
    event.preventDefault();
    // TODO: capture the user paragraph from the page (and validate that it is a paragraph?)

    // TODO: GET the API key from the BE
    const APIKey = await handleSubmitGetApi('http://localhost:8081/getAPIKey');
    console.log("API key: ", APIKey);

    
    // TODO: execute web api call to meaningcloud with the form data and api key 

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
        return(data.key);
    } catch(error) {
        console.log("error: ", error);
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

export { 
    handleSubmitGetApi, 
    handleSubmitPOST,
    handleSubmit
}
