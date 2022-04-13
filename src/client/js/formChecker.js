function checkFormInput(inputText) {
    console.log("::: Running checkFormInput :::", inputText);

    if(inputText != '') {
        document.getElementById('inputPara').style.backgroundColor = 'white';
        document.getElementById('errorMessage').textContent = '';
        return true;
    } 
    else {
        document.getElementById('inputPara').style.backgroundColor = 'pink';
        document.getElementById('errorMessage').textContent = 'Please enter some text to analyze';
        return false;
    }

}

export { checkFormInput }
