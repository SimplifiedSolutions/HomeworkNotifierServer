# HomeworkNotifierServer

Basic Json Schema
user {
    id: <int>,
    netId:<String>,
    key:<String>
}

class {
    id: <int>,
    name: <String>    
}

task {
    id: <int>,
    classId: <int>,
    dueDate: <date>,
    dueTime: <time>,
    description: <String>
}

userClasses {
    userId: <int>,
    classId: <int>
}

iCalendars {
    userId: <int>,
    feed: <url>
}
