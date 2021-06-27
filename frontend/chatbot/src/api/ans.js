const convertAns = (ansBefore, evnObj) => {
    return ansBefore.replace(/\[(.*?)\]/gi, function(...args) {
        const [key, val] = args[1].split(':');
        switch(key) {
            case 'name':
                return evnObj.name;
            case 'emoji':
                return val;
            case 'selection':
                const tempVal = val + ',';
                const pattern = /(.*?)-(.*?),/g;
                const matches = tempVal.matchAll(pattern);
                for(let item of matches) {
                    if(item[1] === evnObj.lastPost.toLowerCase()){
                        return item[2];
                    }
                }
                return '[error: not found]';
            default:
                return args[0];
        }   
    })
}

export default convertAns;