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
