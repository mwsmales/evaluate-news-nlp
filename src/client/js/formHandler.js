function handleSubmitGET(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/getData')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}
    
function handleSubmitPOST(event) {
    event.preventDefault();

    console.log('Posting data: ', "test data");
     const response = fetch('http://localhost:8081/addEntry', {
         method: 'POST', 
         credentials: 'same-origin',
         headers: {
             'Content-Type': 'application/json',
         },
         // Body data type must match "Content-Type" header
         body: JSON.stringify({data: 'test data'}),
     });
     try {
         const responseData = response.json();
         console.log("post response: ", responseData);
     } catch(error) {
         console.log("error: ", error);
     }
}
        


export { handleSubmitGET }
export { handleSubmitPOST }
