class NewThread{
    constructor(payload){
        if(!payload.title || !payload.body || !payload.owner){
            throw new Error('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if(typeof payload.title !== 'string' || typeof payload.body !== 'string' || typeof payload.owner !== 'string'){
            throw new Error('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        this.owner = payload.owner;
        this.title = payload.title;
        this.body = payload.body;
    }
}

module.exports = NewThread;