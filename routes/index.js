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

router.post('/GetAllInfo', function (req, res, next) {
    console.log(req.body);
    var netID = req.body.netID;
    var password = req.body.password;
    getAllInfo(netID, password, function(jsonresult){
        console.log(jsonresult);
        res.status(200).json(jsonresult);
    });
});

function getAllInfo(netID, password, sendDataCallback){
    console.log('Starting getAllInfo function')
    var auth = require('../byu-auth.js'),
        apiKey = sharedSecret = authHeader = url = personId = expireDate = '',
        allUserInfo = {};

    //Get personID, API-Key, Shared Secret, and expireDate
    auth.getSessionKey(netID,password,480,function(wsSession){
        console.log('Starting getSessionKey function')
        console.log(wsSession)
        personId = wsSession.personId;
        apiKey = wsSession.apiKey;
        sharedSecret = wsSession.sharedSecret;
        expireDate = wsSession.expireDate;
        allUserInfo.user = {};
        allUserInfo.user.id = personId;
        console.log(allUserInfo)
        getCourses();
    });

    //Authenticate before each request

    //Get courses for the user (course id, name, number, department)
    function getCourses(){
        console.log('Starting getCourses function')
        // https://ws.byu.edu/rest/v1.0/learningsuite/coursebuilder/course/personEnrolled/{yourPersonID}/period/20131
        //Period is currently hardcoded, we need to get the period from time in the year
        var year_semester = '20161';
        url = 'https://ws.byu.edu/rest/v1.0/learningsuite/coursebuilder/course/personEnrolled/'+allUserInfo.user.id+'/period/'+year_semester;
        authHeader = auth.getAuthHeader(url,sharedSecret,apiKey);
        auth.getRequest(authHeader, url, function(result){
            console.log(result)
            allUserInfo.user.courses = [];
            for(var i = 0; i < result.length; ++i){
                var course = {}; var theirCourse = result[i];
                course.id = theirCourse.id;
                course.title = theirCourse.title;
                course.shortTitle = theirCourse.shortTitle;
                allUserInfo.user.courses[i] = course;
            }
            console.log(allUserInfo)
            console.log(allUserInfo.user.courses)
            getAssignments();
        });
    }

    //Get assignments for each course (assignment id, due date)
    function getAssignments() {
        console.log('Starting getAssignments function')
        loop(0);//Starts the loop at i = 0
    }

    //Recursive callback to simulate synchronous loop
    function loop(j){
        console.log('Starting loop function')
        console.log(j)//j is course number
        console.log(allUserInfo.user.courses[j].id)
        // https://ws.byu.edu/rest/v1.0/learningsuite/assignments/assignment/courseID/wg0ueViT9uzw
        url = 'https://ws.byu.edu/rest/v1.0/learningsuite/assignments/assignment/courseID/' + allUserInfo.user.courses[j].id;
        authHeader = auth.getAuthHeader(url, sharedSecret, apiKey);
        auth.getRequest(authHeader, url, function (result) {
            console.log(result)
            console.log(j)
            console.log(allUserInfo.user.courses[j])
            allUserInfo.user.courses[j].assignments = [];
            for (var i = 0; i < result.length; ++i) {
                //i is assignment number
                var assignment = {}; var theirs = result[i];
                assignment.id = theirs.id;
                assignment.dueDate = theirs.dueDate;
                allUserInfo.user.courses[j].assignments[i] = assignment;
            }
            //This is the endpoint of the entire function that calls the sendDataCallback
            var numCourses = allUserInfo.user.courses.length;
            if(j == numCourses - 1) {
                console.log(allUserInfo)
                console.log('Sending allUserInfo in callback')
                sendDataCallback(allUserInfo);
            } else {
                loop(++i);
            }
        });
    }
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