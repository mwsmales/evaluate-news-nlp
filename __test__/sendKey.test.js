const routeFunctions = require('../src/server/routeFunctions')
// import sendKey from '../src/server/routeFunctions';

test('sendKey returns a json containing "key"', () => {
    const req = { };
    const res = { 
        text: '', 
        send: function(input) {this.text = input}
    };
    
    routeFunctions.sendKey(req, res);
    
    expect(res.text).toContain('key');
})