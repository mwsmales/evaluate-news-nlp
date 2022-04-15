import { meaningCloudGet } from '../src/client/js/meaningCloudInteractions';

test('meaningCloudGet returns an object', async () => {
    fetch.mockResponseOnce(JSON.stringify({
        "agreement": "DISAGREEMENT",
        "confidence": "92",
        "irony": "NONIRONIC",
        "score_tag": "P",
        "subjectivity": "OBJECTIVE"
    }))
    const sentiment = await meaningCloudGet('', '', 'test paragraph')
    expect(sentiment).toHaveProperty('agreement');
})