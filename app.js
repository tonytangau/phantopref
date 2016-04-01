"strict mode"

const phantomas = require('phantomas');
const data = require('./data.json');
const forEachAsync = require('async-foreach').forEach;
const options = {
    "auth-user": "burberry",
    "auth-pass": "",
    "timeout": 3600,
};

forEachAsync(data.links, link => {
    var cnlink = data.host + link + data.query[1];

    phantomas(cnlink, options, function(err, json, results) {
        // err: exit code
        // json: parsed JSON with raw results
        // results: results object with metrics values, offenders, asserts data
        if(err) {
            console.log("ERROR " + err);
        }

        console.log(formatResult(json));
    });
});

var formatResult = function(results) {
    var timeElapsed = results.metrics.httpTrafficCompleted / 1000;
    return results.url + ", " + timeElapsed + "s";
}