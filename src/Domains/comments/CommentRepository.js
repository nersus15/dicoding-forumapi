class CommentRepository {
    async addComment(threadId, payload){
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async deleteComment(threadId, commentId){
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async replyComment(threadId, commentId, payload){
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async deleteReply(threadId, commentId, replyId){
        throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

}

module.exports = CommentRepository;