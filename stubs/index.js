const express = require("express");
const app = express();
const axios = require('axios').default;

app.use(express.static("dist"));

app.get(["/api"], function (request, response) {
    axios.get('http://data.fixer.io/api/latest?access_key=543c7963c89af43c44fc680b2c3a3ab0')
        .then(responseFromApi => response.send(responseFromApi.data))
        .catch(error => response.send(error))
});

app.listen(3000, () => console.log("Listening on port 3000!"));

module.exports = app;