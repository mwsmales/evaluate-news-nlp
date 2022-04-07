import { checkForName } from './js/nameChecker'
import { handleSubmitGET } from './js/formHandler'
import { handleSubmitPOST } from './js/formHandler'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/header.scss'
import './styles/form.scss'
import './styles/footer.scss'



// async post function to test server post route
async function postData(url = '', data = {}) {
    console.log('Posting data: ', data);
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });
    try {
        const responseData = await response.json();
        console.log("post response: ", responseData);
    } catch(error) {
        console.log("error: ", error);
    }
}


// async get function to test server get route
async function getData(url = '', data = {}) {
    console.log('Fetching data from server');
    const response = await fetch(url, {
        method: 'GET', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    try {
        const responseData = await response.json();
        console.log("get response: ", responseData);
        return(responseData);
    } catch(error) {
        console.log("error: ", error);
    }
}


// postData('/addEntry', 'testData');
// console.log(Client.getData('/getData'));

console.log(checkForName);
console.log(handleSubmitGET);

alert("I EXIST")
console.log("CHANGE!!");

export { 
    checkForName,
    handleSubmitGET,
    handleSubmitPOST,
    postData,
    getData,
}