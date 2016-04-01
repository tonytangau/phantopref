"strict mode"

const phantomas = require('phantomas');
const data = require('./data.json');
const forEachAsync = require('async-foreach').forEach;
const options = {
    "auth-user": "burberry",
    "auth-pass": "",
    "timeout": 3600,
    "har": ".har"
};

forEachAsync(data.links, link => {
    var cnlink = data.host + link + data.query[1];
    options.har = link + ".har";

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
    var domLoaded = results.metrics.domContentLoaded / 1000;
    var domComplete = results.metrics.domComplete / 1000;
    return results.url +
        ", Requests: " + results.metrics.requests +
        ", Time: " + timeElapsed + "s" +
        ", domContentLoaded: " + domLoaded + "s" +
        ", domComplete: " + domComplete + "s";
}

// To generate csv and har
// const exec = require('child_process').exec;
// const cmd = 'phantomas "https://cn.stg.apac.burberry.com/" --auth-user=burberry ' +
//     '--auth-pass="" -R csv:timestamp > result.csv ' +
//     '--timeout=3600 --har=result.json';
//
// exec(cmd, function(error, stdout, stderr) {
//     // command output is in stdout
// });