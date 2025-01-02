const PostedComment = require("../../Domains/comments/entities/postedComment");

class AddCommentUseCase {
    constructor({commentRepository, threadRepository}){
        this._commentRepository = commentRepository;
        this._threadRepository = threadRepository;
    }

    async execute(threadId, payload){
        await this._threadRepository.getThreadById(threadId);
        return this._commentRepository.addComment(threadId, payload);
    }
}

module.exports = AddCommentUseCase;