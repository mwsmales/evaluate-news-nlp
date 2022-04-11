// enclosing async function to post the new entry then get the project data
async function handleSubmit(event) {
    event.preventDefault();

    await handleSubmitPOST();

    const projectData = await handleSubmitGET();
    console.log(projectData);

}


function handleSubmitGET() {
    
    // retrieve data from the server then update the UI
    fetch('http://localhost:8081/getData')
    .then(res => res.json())
    .then(function(res) {
        console.log(res.data);
        document.getElementById('results').innerHTML = res.data;
    });    
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
    });    
    try { 
        // wait to get a non-error response from the server, then exit the function
       const responseData = await response.json(); 
       console.log("post response: ", responseData);
    } catch(error) {
        console.log("error: ", error);
    }    
}    

export { 
    handleSubmitGET, 
    handleSubmitPOST,
    handleSubmit
}
