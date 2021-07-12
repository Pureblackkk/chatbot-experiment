// Base url for request user information 
// const base = 'http://119.29.62.27:82/';
const base = 'http://127.0.0.1:8000/';


// Full request path for require user information 
const UrlPath = {
    user: base + 'api/user/',
    question: base + 'api/question/'
}

// Skip this section if SkipMax times wrong answer
const SkipMax = 4;

// Type speed for per second how many characters
const TypeRatio = 6;

// Number of question for single page Questionnaire
const QuestionNumber = 6;

export {UrlPath, SkipMax, TypeRatio, QuestionNumber};