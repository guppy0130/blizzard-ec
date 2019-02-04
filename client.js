const request = require('request');
const [,, ...args] = process.argv;

if (args.length !== 2 || !Number.isInteger(Number(args[1])) || Number(args[1]) < 1) {
    console.log('');
    console.log('Usage: node ./client.js [url] [number]');
    console.log('[url] is the URL to access');
    console.log('[number] is an integer at least 1 that describes how many times to test per second');
    console.log('');
    console.log('Returns: time(s) in ms, success and failure count, average TTLB');
    console.log('');
} else {
    const req = {
        url: args[0],
        time: true
    };

    const results = {
        success: 0,
        failure: 0,
        //timings: [],
        average: 0,
        version: 0
    };

    const successCallback = (ttlb, version) => {
        let counter = results.success + results.failure;
        ttlb = parseFloat(ttlb);
        results.average = results.average === 0 ? ttlb : ((results.average * counter + ttlb) / (counter + 1)).toFixed(3);
        results.success = results.success + 1;
        results.version = version;
    };

    const failureCallback = () => {
        results.failure = results.failure + 1;
    };

    const printResults = () => {
        console.log(`S: ${results.success} / F: ${results.failure} / AVG: ${results.average} / VER: ${results.version}`);
    };

    const interval = setInterval(() => {
        request(req, (err, response, body) => {
            if (err) {
                failureCallback();
            } else {
                if (response.statusCode === 200) {
                    let ttlb = parseFloat(response.timingPhases.firstByte + response.timingPhases.download).toFixed(3);
                    let version = JSON.parse(body)['version'];
                    successCallback(ttlb, version);
                } else {
                    failureCallback();
                }
            }
            printResults();
        });
    }, parseInt(1000 / parseInt(args[1])));
}
