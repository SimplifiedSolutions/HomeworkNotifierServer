var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile('basic.html', {root: 'public'});
});

/*************HANDERS**********/
router.post('/AddUser', function (req, res, next) {
    //var jsonObject = req.body; //json object
    //var jsonObject = JSON.parse(req.body); //string
    console.log(req.body);
    var name = req.body.name;
    var netId = req.body.netId;
    var password = req.body.password;

    // Mongodb calls

    var jsonresult = {success: true, message: "Your awesome beans.", data: {key: "a1key"}};
    console.log(jsonresult);
    res.status(200).json(jsonresult);
});

//is this a post? In other words, will this call actually generate/store a deletionKey for the to-be-expunged-user?
router.post('/DeleteUser', function (req, res, next) {
    console.log(req.body);
    var netId = req.body.netId;
    var key = req.body.key;

    //TODO: set variables success, message, and deletion key to return.
    var deletionKeyResult = "test";
    var messageResult = "testMessage";
    var successResult = true;

    // Mongodb calls

    var jsonresult = {success: successResult, message: messageResult, data: {deletionKey: deletionKeyResult}};
    console.log(jsonresult);
    res.status(200).json(jsonresult);
});

router.post('/ConfirmDeleteUser', function (req, res, next) {
    console.log(req.body);
    var netId = req.body.netId;
    var key = req.body.key;
    var deletionKey = req.body.deletionKey;

    //TODO: set variables success, message, and deletion key to return.
    var deletionKeyResult;
    var messageResult;
    var successResult;

    // Mongodb calls

    var jsonresult = {success: successResult, message: messageResult, data: {deletionkey: deletionKeyResult}};
    console.log(jsonresult);
    res.status(200).json(jsonresult);
});

router.get('/GetCourses', function (req, res, next) {
    console.log(req.body);
    var netId = req.query.netId;
    var key = req.query.key;

    //TODO: set variables success, message, and deletion key to return.

    var messageResult = "NetId:" + netId + "  key:" + key;
    var successResult = true;
    var coursesResult = [];
    var course = {courseId:"24601", name:"CS 125"};
    coursesResult.push(course);

    // Mongodb calls

    var jsonresult = {success: successResult, message: messageResult, data: {courses: coursesResult}};
    console.log(jsonresult);
    res.status(200).json(jsonresult);
});

router.get('/GetTasks', function (req, res, next) {
    console.log(req.body);
    var netId = req.query.netId;
    var key = req.query.key;

    //TODO: set variables success, message, and deletion key to return.
    var successResult = true;
    var messageResult = "NetId:" + netId + "  key:" + key;
    var tasksResult = [];
    var task = {courseId:"24601", name:"CS 125"};
    coursesResult.push(course);

    // Mongodb calls

    var jsonresult = {success: successResult, message: messageResult, data: {tasks: tasksResult}};
    console.log(jsonresult);
    res.status(200).json(jsonresult);
});


/**************END HANDLERS*************/
module.exports = router;
