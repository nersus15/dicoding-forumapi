class PostedComment {
    constructor(payload){
        if(!payload.id || !payload.content || !payload.owner || !payload.date){
            throw new Error('POSTED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if(typeof payload.id != 'string' || typeof payload.content !== 'string' || typeof payload.owner !== 'string' || typeof payload.date !== 'string'){
            throw new Error('POSTED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        this.id = payload.id;
        this.content = payload.content;
        this.owner = payload.owner;
        this.date = payload.date;
    }
}

module.exports = PostedComment;