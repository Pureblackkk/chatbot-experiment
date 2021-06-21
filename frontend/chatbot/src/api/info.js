import {UrlPath} from '../config/config';

const fetchInfo = function(info, success, fail) {
    fetch(UrlPath.user, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })
    .then((response) => {
        if(response.status === 200) {
            return response.json();
        }else{
            return Promise.reject();
        }
    })
    .then((data) => {
        success(data);
    })
    .catch((e) => {
        fail();
    })
}

export default fetchInfo;