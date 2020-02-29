const express = require("express");
const app = express();
const axios = require('axios').default;
const path = require('path');
const history = require('connect-history-api-fallback');

app.use(express.static("dist"));

const staticFileMiddleware = express.static(path.join(__dirname));
app.use(staticFileMiddleware);
app.use(history());
app.use(staticFileMiddleware);

const {API_URLS} = require('../src/__data__/constants/api-urls.js');
const {API_KEYS} = require('../src/__data__/constants/api-keys.js');
const {DEF_DATA} = require('../src/__data__/constants/default_quotes');

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/index.html'))
});

app.get(["/getDataByBaseQuote"], function (request, response) {
    let quotes = DEF_DATA.QUOTE_PAIRS;
    if (typeof request.query.selectedQuotes !== 'undefined' && request.query.selectedQuotes.length > 0) {
        quotes = request.query.selectedQuotes;
    }
    axios.get(API_URLS.CURRATE + '?get=rates&pairs=' + quotes.join(',') + '&key=' + API_KEYS.CURRATE)
        .then(responseFromApi => response.send(responseFromApi.data))
        .catch(error => response.send(error))
});

app.get(["/getQuotes"], function (request, response) {
    axios.get(API_URLS.CURRATE + '?get=currency_list&key=' + API_KEYS.CURRATE)
        .then(responseFromApi => response.send(responseFromApi.data))
        .catch(error => response.send(error));
});

app.listen(3000, () => console.log("Listening on port 3000!"));

module.exports = app;