import { checkForName } from './js/nameChecker'
import { handleSubmitGET } from './js/formHandler'
import { handleSubmitPOST } from './js/formHandler'
import { handleSubmit } from './js/formHandler'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/header.scss'
import './styles/form.scss'
import './styles/footer.scss'


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


console.log(checkForName);
console.log(handleSubmitGET);

alert("I EXIST");

export { 
    checkForName,
    handleSubmitGET,
    handleSubmitPOST,
    handleSubmit,
    getData,
}