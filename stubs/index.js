const express = require("express");
const app = express();
const axios = require('axios').default;

app.use(express.static("dist"));

app.get(["/getDataByBaseQuote"], function (request, response) {
    let quotes = ['BCHEUR,BCHGBP,BCHXRP'];
    if (typeof request.query.selectedQuotes !== 'undefined' && request.query.selectedQuotes.length > 0) {
        quotes = request.query.selectedQuotes;
    }
    axios.get('https://currate.ru/api/?get=rates&pairs='+ quotes.join(',') +'&key=8c33f32ce2ae72696d3cd1669b68d069')
        .then(responseFromApi => response.send(responseFromApi.data))
        .catch(error => response.send(error))
});
app.get(["/getQuotes"], function (request, response) {
    axios.get('https://currate.ru/api/?get=currency_list&key=8c33f32ce2ae72696d3cd1669b68d069')
        .then(responseFromApi => response.send(responseFromApi.data))
        .catch(error => response.send(error));
});

app.listen(3000, () => console.log("Listening on port 3000!"));

module.exports = app;