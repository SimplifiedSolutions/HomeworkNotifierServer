/**
 * Created by dtaylor on 3/7/2016.
 */
var soap = require('soap');
var url = 'http://example.com/wsdl?wsdl';
var args = {name: 'value'};
var client;
soap.createClient(url, function(err, client) {
    client.setSecurity(new soap.BasicAuthSecurity('daviddt2', 'davidpaseo3'));
    client.MyFunction(args, function(err, result) {
        console.log(result);
    });
});