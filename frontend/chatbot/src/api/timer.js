export class SingletonConversationTimer {
    constructor() {
        this._startTime = undefined;
        this._endTime = undefined;
    }

    _cleanTypeRecord() {
        this._startTime = undefined;
        this._endTime = undefined;
    }

    setTypeStart() {
        this._startTime = new Date();
    }

    setTypeEnd() {
        this._endTime = new Date();
    }

    getReportTime() {
        const duration = Math.floor((this._endTime.getTime() - this._startTime.getTime())/ 1000);
        this._cleanTypeRecord();
        return duration.toString();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new SingletonConversationTimer();
            return this.instance;
        }
    }
}