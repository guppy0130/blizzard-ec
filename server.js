const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        date: new Date(),
        version: 'v1'
    });
});

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = server;
