// Base url for request user information 
const base = 'http://119.29.62.27:82/';

// Full request path for require user information 
const UrlPath = {
    user: base + 'api/user/',
}

// Skip this section if SkipMax times wrong answer
const SkipMax = 4;

// Type speed for per second how many characters
const TypeRatio = 20;

export {UrlPath, SkipMax, TypeRatio};