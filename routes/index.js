var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile('basic.html', {root: 'public'});
});

/*************HANDLERS**********/
router.post('/AddUser', function (req, res, next) {

    console.log(req.body);

    // Mongodb calls
    var newUser = new User(req.body);
    newUser.save(function(err, post) {
        if (err){
            var jsonresult = {success: false, message: "Your request can has many many fail. For real."};
            console.error(jsonresult);
            res.status(404).json(jsonresult);//TODO: what to send back if person isn't in the BYU student database?
            return console.error(err);
        }
        console.log(post);
        //TODO: generate keys
        var jsonresult = {success: true, message: "User added! For the win!", data: {key: "aKey"}};
        console.log(jsonresult);
        res.status(200).json(jsonresult);
    });

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
    var course = {courseId:12142, name:"CS 125"};
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
    var courseIdResult = 1241242;
    var dateResult = "April 14th, 2015";
    var timeResult = "4:00PM";
    var descriptionResult = "Description: This is a class!";
    var completeResult = true;

    var tasksResult = [];
    var task = {courseId: courseIdResult,
        dueDate: dateResult,
        dueTime: timeResult,
        description: descriptionResult,
        complete: completeResult};
    tasksResult.push(task);

    // Mongodb calls

    var jsonresult = {success: successResult, message: messageResult, data: {tasks: tasksResult}};
    console.log(jsonresult);
    res.status(200).json(jsonresult);
});


//********TASKS*******
router.post('/AddTask', function (req, res, next) {
    console.log(req.body);
    var netId = req.body.netId;
    var key = req.body.key;
    var courseId = req.body.courseId;
    var dueDate = req.body.dueDate;
    var dueTime = req.body.dueTime;
    var description = req.body.description;

    // Mongodb calls

    var successResult = true;
    var messageResult = "netId:"+ netId + " key:"+key + " courseId:" + courseId + "dueDate:" +dueDate+ " dueTime:" +dueTime+"description:" +description;
    var jsonresult = {success: successResult, message: messageResult};
    console.log(jsonresult);
    res.status(200).json(jsonresult);
});

router.post('/CompleteTask', function (req, res, next) {
    console.log(req.body);
    var netId = req.body.netId;
    var key = req.body.key;
    var taskId = req.body.taskId;

    // Mongodb calls

    var successResult = true;
    var messageResult = "netId:"+ netId + " key:"+key + "taskId:" +taskId;
    var jsonresult = {success: successResult, message: messageResult};
    console.log(jsonresult);
    res.status(200).json(jsonresult);
});

router.post('/DeleteTask', function (req, res, next) {
    console.log(req.body);
    var netId = req.body.netId;
    var key = req.body.key;
    var taskId = req.body.taskId;

    // Mongodb calls

    var successResult = true;
    var messageResult = "netId:"+ netId + " key:"+key +  "taskId:" +taskId;
    var jsonresult = {success: successResult, message: messageResult};
    console.log(jsonresult);
    res.status(200).json(jsonresult);
});

router.get('/GetAllInfo', function (req, res, next) {
    console.log(req.body);
    getAllInfo(key, sendDataCallback)
});

function getAllInfo(key, sendDataCallback){
    //Get API-Key and Shared Secret
    //Authenticate
    var auth = require('../byu-auth.js');
    //Get person id
    // https://ws.byu.edu/rest/v2.0/identity/person/directory/{netid}

    //Get courses for the user (course id, name, number, department)
    // https://ws.byu.edu/rest/v1.0/learningsuite/coursebuilder/course/personEnrolled/{yourPersonID}/period/20131

    //Get assignments for each course (assignment id, due date)
    // https://ws.byu.edu/rest/v1.0/learningsuite/assignments/assignment/courseID/wg0ueViT9uzw

    //Stream of callback functions with the final one that calls the sendDataCallback function
}

/**************END HANDLERS*************/
module.exports = router;



/**** Set up mongoose in order to connect to mongo database ****/
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://ec2-54-187-234-170.us-west-2.compute.amazonaws.com/notifierDB'); //Connects to a mongo database called "commentDB"

var userSchema = mongoose.Schema({ //Defines the Schema for this database
    name: String,
    netId: String,
    key: String,
    courseIds: [String],
    taskIds: [String]
},{collection:"users"});
//var courseSchema = mongoose.Schema({ //Defines the Schema for this database
//    courseName: String,
//});
//var taskSchema = mongoose.Schema({ //Defines the Schema for this database
//    Name: String,
//    Comment: String
//});

var User = mongoose.model('User', userSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Database connected');
});