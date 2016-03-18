function getSessionKey(netid,password,timeout)
{
	var querystring = require('querystring');
	var http = require('https');

	var data = querystring.stringify({
	      netId: netid,
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
	        var authHeader = encrypt('https://ws.byu.edu/rest/v2.1/identity/person/directory/Student/Name/1/Taylor/David',wsSession.sharedSecret,wsSession.apiKey);
	        console.log("header: "+authHeader);
	        getRequest(authHeader);
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

function getRequest(authHeader)
{
	var https = require("https");
	var https_get_options = {
	    "host": 'ws.byu.edu',
	    "path": '/rest/v2.1/identity/person/directory/Student/Name/1/Taylor/David',
	    "port": '443',
	    "method": 'GET',
	    "headers": {
	        "Authorization": authHeader
	    }
	};
	var request = https.request(https_get_options, function(res) {
	    //console.log('STATUS: ' + res.statusCode);
		//console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
		  console.log('BODY: ' + chunk);
		});
	});
	request.on('error', function(e) {
	    //console.log('problem with request: ' + e.message);
	});
	request.end();
}
//{"personId":"093230722","apiKey":"6YwYs8PLsqWG5Lrn9wwt","sharedSecret":"GwAwG6tzK4bxxdbls8foozJUIX_xFDKDiZOdziMV","expireDate":"2016-03-18T03:03:59.404-06:00"}
//encrypt('https://ws.byu.edu/rest/v2.1/identity/person/directory/Student/Name/1/Taylor/David','iQprZOu93jHS6GxFwzQrZu-qSXtlAVBtm2S01A0t','gj-rQ-Pbq1NnsO5VGj1u');

//getSessionKey('daviddt2','davidpaseo3','480');
getSessionKey(process.argv[2],process.argv[3],process.argv[4]);
//encrypt('https://ws.byu.edu/rest/v2.1/identity/person/directory/Student/Name/1/Taylor/David',wsSession.sharedSecret,wsSession.apiKey);

