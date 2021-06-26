// Base url for request user information 
const base = 'http://127.0.0.1:8000/';

// Full request path for require user information 
const UrlPath = {
    user: base + 'api/user/',
}

// Skip this section if SkipMax times wrong answer
const SkipMax = 4;

// Type speed for per second how many characters
const TypeRatio = 10;

// Male and Female name 
const userName = {
    male: '',
    fmale: ''
}


export {UrlPath, SkipMax, TypeRatio};