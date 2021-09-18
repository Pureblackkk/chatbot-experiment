// Base url for request user information 
// const base = 'http://39.108.179.149:82/';
const base = 'http://127.0.0.1:8000/';


// Full request path for require user information 
const UrlPath = {
    user: base + 'api/user/',
    question: base + 'api/question/',
    dialog: base + 'api/dialog/',
}

// Skip this section if SkipMax times wrong answer
const SkipMax = 4;

// Type speed for per second how many characters
const TypeRatio = 6;

// Number of question for single page Questionnaire
const QuestionNumber = 6;

// Is opening internet mode
const InternetMode = false;

// Reply when not hit the key when not using internet mode 
const FailReply = "Sorry I can't understand. Please follow the instruction!"

// Input delay post time 
const DelayPostTime = 3000;

// Plain text mode
const IsPlainTextMode = false;

export { 
    UrlPath, 
    SkipMax, 
    TypeRatio, 
    QuestionNumber, 
    InternetMode, 
    FailReply,
    DelayPostTime,
    IsPlainTextMode,
};