const convertAns = (ansBefore, evnObj) => {
    return ansBefore.replace(/\[(.*?)\]/gi, function(...args) {
        const [key, val] = args[1].split(':');
        console.log(key, val);
        switch(key) {
            case 'name':
                return evnObj.name;
            case 'emoji':
                return val;
            case 'selection':
                return 'This is a selection';
            default:
                return args[0];
        }   
    })
}

export default convertAns;