# Blizzard Extra Credit Coding Challenge - SRE Intern

 [![Build Status](https://travis-ci.com/guppy0130/blizzard-ec.svg?branch=master)](https://travis-ci.com/guppy0130/blizzard-ec)

1. Write a web application in your language of choice that returns the current date/time in JSON.   
2. Write a simple test application that will query this “API” X times per second and record success/failure/TTLB (Time to last byte).
3. Perform a blue-green deploy with the method/technology of your choosing while the test application is running and demonstrate there were no failed requests.
    1. Go from a single instance of v1 to a single instance of v2 gracefully.

## Web Application

Run `npm start` to run `server.js`. Hitting the `/` endpoint returns something similar to this:

```json
{
    "date": "2019-02-02T23:28:49.335Z",
    "version": "1"
}
```

## Client

Run with:

```bash
node ./client.js [url] [number]
```

* `[url]` is the URL to access.
* `[number]` is an integer at least 1 that describes how many times to test per second
