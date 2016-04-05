var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile('login.html', {root: 'public'});
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
    console.log('In GetAllInfo route')
    //console.log(req.body);
    //Check parameters
    if(req.body.netID == undefined || req.body.netID == ''){
        var err = {error:'netID is required'}
        console.log(err);
        res.status(400).json(err);
    } else if(req.body.password == undefined || req.body.password == ''){
        var err = {error:'password is required'}
        console.log(err);
        res.status(400).json(err);
    }
    var netID = req.body.netID;
    var password = req.body.password;
    var year_semester = req.body.year_semester;
    getAllInfo(netID, password, year_semester, function(err, jsonresult){
        console.log('err = ' + err)
        console.log('jsonresult = ' + jsonresult)
        if(err) {
            console.log(err)
            res.status(400).json(err);
        } else {
            console.log(jsonresult);
            res.status(200).json(jsonresult);
        }
    });
});

function getAllInfo(netID, password, year_semester, sendDataCallback){
    console.log('Starting getAllInfo function')
    var auth = require('../byu-auth.js'),
        apiKey = sharedSecret = authHeader = url = personId = expireDate = '',
        allUserInfo = {};

    //Get personID, API-Key, Shared Secret, and expireDate; unsure what the timeout should be
    auth.getSessionKey(netID,password,1,function(wsSession){
        if(wsSession != "error") {
            console.log('Starting getSessionKey callback function')
            console.log(wsSession)
            personId = wsSession.personId;
            apiKey = wsSession.apiKey;
            sharedSecret = wsSession.sharedSecret;
            expireDate = wsSession.expireDate;
            allUserInfo.user = {};
            allUserInfo.user.id = personId;
            //console.log(allUserInfo)
            getCourses();
        }
        else
        {
            sendDataCallback({error: 'Invalid Credentials'});
        }
    });

    //Authenticate before each request

    //Get courses for the user (course id, name, number, department)
    function getCourses(){
        //console.log('Starting getCourses function')
        // https://ws.byu.edu/rest/v1.0/learningsuite/coursebuilder/course/personEnrolled/{yourPersonID}/period/20131
        //If no year_semester is passed in get the year_semester from time in the year
        if(year_semester == undefined || year_semester == ''){
            console.log('expireDate = ' + expireDate)
            console.log(new Date())
            //Parse first part of expireDate to grab year, month, and day
            var year = expireDate.substr(0,4);
            var month = expireDate.substr(5,2);
            var day = expireDate.substr(8,2);
            var semester = 0;
            if(month < 4 || month == 4 && day <= 22){
                semester = 1;
            } else if(month == 4 && day > 22 || month < 6 || month == 6 && day <= 19){
                semester = 3;
            } else if(month == 6 && day > 19 || month < 8 || month == 8 && day <= 17){
                semester = 4;
            } else {
                semester = 5;
            }
            year_semester = year + semester;
        }
        url = 'https://ws.byu.edu/rest/v1.0/learningsuite/coursebuilder/course/personEnrolled/'+allUserInfo.user.id+'/period/'+year_semester;
        authHeader = auth.getAuthHeader(url,sharedSecret,apiKey);
        auth.getRequest(authHeader, url, function(result){
            //console.log(result)
            //If there are no courses returned send error
            if(result.length == 0){
                return sendDataCallback({error:'User has no courses for this semester.'});
            }
            allUserInfo.user.courses = [];
            for(var courseNum = 0; courseNum < result.length; ++courseNum){
                var course = {}; var theirCourse = result[courseNum];
                course.id = theirCourse.id;
                course.title = theirCourse.title;
                course.shortTitle = theirCourse.shortTitle;
                allUserInfo.user.courses[courseNum] = course;
            }
            //console.log(allUserInfo)
            //console.log(allUserInfo.user.courses)
            loop(0);
        });
    }

    //Recursive callback to simulate synchronous loop
    function loop(courseNum){
        //console.log('Starting loop function')
        //console.log(courseNum)
        //console.log(allUserInfo.user.courses[courseNum].id)
        getCategories(courseNum, function(){
            //This is the endpoint of the entire function that calls the sendDataCallback
            var numCourses = allUserInfo.user.courses.length;
            if(courseNum == numCourses - 1) {
                //console.log(allUserInfo)
                console.log('Sending allUserInfo in callback')
                sendDataCallback(undefined,allUserInfo);
            } else {
                loop(++courseNum);
            }
        });
    }

    //Get category name that matches category id
    function getCategories(courseNum, callback){
        //console.log('Starting getCategories function')
        //https://ws.byu.edu/rest/v1.0/learningsuite/assignments/category/courseID/wg0ueViT9uzw
        url = 'https://ws.byu.edu/rest/v1.0/learningsuite/assignments/category/courseID/' + allUserInfo.user.courses[courseNum].id;
        authHeader = auth.getAuthHeader(url, sharedSecret, apiKey);
        auth.getRequest(authHeader, url, function(result){
            //console.log(result)
            getAssignments(courseNum, result, callback);
        });
    }

    //Get assignments for each course (assignment id, due date)
    function getAssignments(courseNum, categories, callback) {
        //console.log('Starting getAssignments function')
        // https://ws.byu.edu/rest/v1.0/learningsuite/assignments/assignment/courseID/wg0ueViT9uzw
        url = 'https://ws.byu.edu/rest/v1.0/learningsuite/assignments/assignment/courseID/' + allUserInfo.user.courses[courseNum].id;
        authHeader = auth.getAuthHeader(url, sharedSecret, apiKey);
        auth.getRequest(authHeader, url, function (result) {
            //console.log(result)
            //console.log(courseNum)
            //console.log(allUserInfo.user.courses[courseNum])
            allUserInfo.user.courses[courseNum].assignments = [];
            for (var assignNum = 0; assignNum < result.length; ++assignNum) {
                var assignment = {}; var theirs = result[assignNum];
                assignment.id = theirs.id;
                assignment.categoryID = theirs.categoryID;
                for (var categoryNum = 0; categoryNum < categories.length; ++categoryNum) {
                    if(assignment.categoryID == categories[categoryNum].id){
                        //console.log(categories[categoryNum].title)
                        assignment.category = categories[categoryNum].title;
                        break
                    }
                }
                assignment.courseID = theirs.courseID;

                assignment.description = removeHtml(theirs.description);
                assignment.dueDate = theirs.dueDate*1000;
                assignment.graded = theirs.graded;
                assignment.name = theirs.name;
                assignment.points = theirs.points;
                assignment.type = theirs.type;
                assignment.url = theirs.url;
                assignment.weight = theirs.weight;

                allUserInfo.user.courses[courseNum].assignments[assignNum] = assignment;
            }
            callback();
        });
        function removeHtml(html)
        {
            var result = "";
            var htmlparser = require("htmlparser2");
            var parser = new htmlparser.Parser({
                onopentag: function(name, attribs){
                    switch(name)
                    {
                        case "a":
                            result += attribs.href+'\n';
                            break;
                        case "p":
                            result += "";
                    }
                },
                ontext: function(text){
                    result += text.replace("&nbsp;"," ");
                },
                onclosetag: function(tagname){
                }
            }, {decodeEntities: true});
            parser.write(html);
            parser.end();
            return result;
        }
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