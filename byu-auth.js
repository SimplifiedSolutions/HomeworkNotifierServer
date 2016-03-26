function getSessionKey(netID,password,timeout,callback)
{
	var querystring = require('querystring');
	var http = require('https');

	var data = querystring.stringify({
	      netId: netID,
	      password: password,
	      timeout: timeout
	    });

	var options = {
	    host: 'ws.byu.edu',
	    port: 443,
	    path: '/authentication/services/rest/v1/ws/session',
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'Content-Length': Buffer.byteLength(data)
	    }
	};
	var req = http.request(options, function(res) {
	    res.setEncoding('utf8');
	    res.on('data', function (chunk) {
	    	var wsSession = JSON.parse(chunk);
	        console.log("body: " + wsSession);
	        console.log("shared: " + wsSession.sharedSecret);
	        console.log("apikey: "+ wsSession.apiKey);
	        callback(wsSession);
	    });
	});

	req.write(data);
	req.end();
}
function getTimestamp() {
    var now = new Date();
    var year = now.getFullYear();
    var month = lpad(now.getMonth() + 1);
    var day = lpad(now.getDate());
    var hour = lpad(now.getHours());
    var minute = lpad(now.getMinutes());
    var second = lpad(now.getSeconds());
    var timestamp = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
	//console.log(timestamp);
    return timestamp;
}


//helper function for getTimestamp()
function lpad(input) {
    var ContentToSize = '' + input;
    var PadLength = 2;
    var PadChar = '0';
    var PaddedString=ContentToSize.toString();
    for(i=ContentToSize.length;i<PadLength;i++) {
        PaddedString=PadChar+PaddedString;
    }
    return PaddedString;
}
function encrypt(url,sharedSecret,webServiceId)
{
	var sha512 = require('./sha512.js');
	//console.log(sha512);
    var timestamp = getTimestamp();
    var msg = url + timestamp;
    var hash = sha512.b64_hmac_sha512(sharedSecret, msg);
    var authorization = 'URL-Encoded-WsSession-Key ' + webServiceId + ',' + hash + '==,' + timestamp;
    //console.log(authorization);
	return authorization;
}

function getRequest(authHeader, requestedUrl, callback)
{
    var url = require("url");
    var parsedUrl = url.parse(requestedUrl);
	var protocol = require(parsedUrl.protocol.replace(":",""));
	var get_options = {
	    "host": parsedUrl.hostname,
	    "path": parsedUrl.pathname,
	    "method": 'GET',
	    "headers": {
	        "Authorization": authHeader
	    }
	};
	var request = protocol.request(get_options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
		  //console.log('BODY: ' + chunk);
			var jsonObj = JSON.parse(chunk);
			callback(jsonObj);
		});
	});
	request.on('error', function(e) {
	    //console.log('problem with request: ' + e.message);
	});
	request.end();
}

function getRequestCallback(jsonObj)
{
    if(jsonObj != null) {
        //console.log(JSON.stringify(jsonObj));
        var fs = require('fs');
        fs.writeFile('./responses/assignments.js', jsonObj, function (err) {
            if (err) return console.log(err);
            console.log('Hello World > helloworld.txt');
        });
    }
    else
    {
        console.log('does not exist');
    }
}

function getStuff(wsSession)
{
	var paths = ['https://ws.byu.edu/rest/v1.0/learningsuite/assignments/assignment/courseID/5wyigGxZA8uJ'];
	for(var i in paths)
	{
		var authHeader = encrypt(paths[i],wsSession.sharedSecret,wsSession.apiKey);
        console.log();
        console.log("path: "+paths[i]);
		console.log("header: "+authHeader);
		getRequest(authHeader, paths[i], getRequestCallback);
	}

}

function logCallback(jsonObj)
{
    console.log(JSON.stringify(jsonObj));
}

//{"personId":"093230722","apiKey":"6YwYs8PLsqWG5Lrn9wwt","sharedSecret":"GwAwG6tzK4bxxdbls8foozJUIX_xFDKDiZOdziMV","expireDate":"2016-03-18T03:03:59.404-06:00"}
//encrypt('https://ws.byu.edu/rest/v2.1/identity/person/directory/Student/Name/1/Taylor/David','iQprZOu93jHS6GxFwzQrZu-qSXtlAVBtm2S01A0t','gj-rQ-Pbq1NnsO5VGj1u');

//getSessionKey('daviddt2','davidpaseo3','480');
console.log("Args:");
for(var i in process.argv)
{
    console.log(i+': '+process.argv[i]);
}
switch (process.argv[2]) {
    case "getSessionKey":
        getSessionKey(process.argv[3],process.argv[4],480,function(result)
        {
            console.log("Ws-session:\n"+JSON.stringify(result));
        });
        break;
    case "getAuthHeader":
        if(process.argv.length == 6)
        {
            var auth = encrypt(process.argv[3],process.argv[4],process.argv[5]);
            console.log("URL: "+process.argv[3]);
            console.log("AuthHeader:");
            console.log(auth);
        }
        else
        {
            console.log(process.argv.length);
            console.log('Usage: getAuthHeader url sharedSecret webserviceId');
        }

        break;
    case "test":
        getSessionKey('daviddt2','davidpaseo3',480,getStuff);
        //test(process.argv[3]);
        break;
    default:
        console.log("not a function");
}
//getSessionKey(process.argv[2],process.argv[3],process.argv[4],logCallback);
//encrypt(process.argv[5],)
//encrypt('https://ws.byu.edu/rest/v2.1/identity/person/directory/Student/Name/1/Taylor/David',wsSession.sharedSecret,wsSession.apiKey);
module.exports.getSessionKey=getSessionKey; //getSessionKey(netID,password,timeout,callback)
module.exports.getAuthHeader=encrypt; //getAuthHeader(url,sharedSecret,webServiceId)
module.exports.getRequest=getRequest; //getRequest(authHeader, host, path, callback)

