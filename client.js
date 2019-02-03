const request = require('request-promise-native');
const [,, ...args] = process.argv;

if (args.length !== 2 || !Number.isInteger(parseInt(args[1]))) {
    console.log('');
    console.log('Usage: node ./client.js [url] [number]');
    console.log('[url] is the URL to access');
    console.log('[number] is an integer that describes how many times to test');
    console.log('');
    console.log('Returns: time(s) in ms, success and failure count, average TTLB');
    console.log('');
} else {
    const req = {
        url: args[0],
        time: true,
        resolveWithFullResponse: true
    };

    const results = {
        success: 0,
        failure: 0,
        timings: [],
        average: 0
    };

    const requests = [];

    for (let i = 0; i < parseInt(args[1]); i++) {
        requests.push(request(req).then(response => {
            return (response.timingPhases.firstByte + response.timingPhases.download).toFixed(3);
        }).catch(() => {
            return -1;
        }));
    }

    Promise.all(requests).then(values => {
        values.forEach(elem => {
            elem = parseFloat(elem);
            if (elem > 0) {
                let counter = results.success + results.failure;
                results.success = results.success + 1;
                results.timings.push(elem);
                results.average = results.average === 0 ? elem : ((results.average * counter + elem) / (counter + 1));
            } else {
                results.failure = results.failure + 1;
            }
        });
    }).then(() => {
        results.average = results.average.toFixed(3);
        console.log(results);
    });
}
