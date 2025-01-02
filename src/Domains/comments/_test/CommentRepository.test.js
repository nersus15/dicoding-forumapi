const CommentRepository = require("../CommentRepository");

describe('CommentRepository', () => {
    it('should throw error if when invoke abstract behavior', () => {
        const commentRepository = new CommentRepository();

        expect(commentRepository.addComment).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        expect(commentRepository.deleteComment).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        expect(commentRepository.replyComment).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        expect(commentRepository.deleteReply).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });
});