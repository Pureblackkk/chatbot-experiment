const sparseObject = (str) => {
    const tempStr = str + ',';
    const pattern = /(.*?)-(.*?),/g;
    const matches = tempStr.matchAll(pattern);
    return matches;
}

const calProcess = (calObject, evnObj) => {
    const {val, operator, ratio} = calObject;
    switch(operator) {
        case 'times':
            return parseFloat(evnObj[val]) * parseFloat(ratio);
        default:
            return '[error]';
    }
}

const convertAns = (ansBefore, evnObj) => {
    return ansBefore.replace(/\[(.*?)\]/gi, function(...args) {
        const [key, val] = args[1].split(':');
        switch(key) {
            case 'name':
                return evnObj.name;
            case 'emoji':
                return val;
            case 'selection':
                const matches = sparseObject(val);
                let yearlyIncome = evnObj.income;
                console.log('evenObj', evnObj);
                console.log('yearly income:', yearlyIncome);
                console.log(yearlyIncome.match(/\d+/));
                yearlyIncome = parseFloat(yearlyIncome.match(/\d+/)[0]);
                try {
                    for(let item of matches) {
                        if(item[1] === evnObj.riskLevel.toLowerCase()){
                            let res = parseFloat(item[2]) * yearlyIncome * 0.2 * 0.01;
                            return Math.floor(res);
                        }
                    }
                }
                catch {
                    return '[error: not found]';
                }
                
                break;
            case 'calculation':
                const calArray = sparseObject(val);
                const calObject = {};
                for(let item of calArray) {
                    calObject[item[1]] = item[2];
                }
                return calProcess(calObject, evnObj);
            default:
                return args[0];
        }   
    })
}

export default convertAns;