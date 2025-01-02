const CommentRepository = require("../../../Domains/comments/CommentRepository");
const PostedComment = require("../../../Domains/comments/entities/postedComment");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const AddCommentUseCase = require("../AddCommentUseCase");

describe('AddCommentUseCase', () => {
    it('should orchestrating the add comment correctly', async () => {
        const newCommentPayload = {
            content: 'new thread',
            owner: 'user-123'
        };

        const date = new Date().toISOString();
        const threadId = 'thread-123';
        const mockPostedComment = {
            id: 'comment-123',
            content: 'new thread',
            owner: 'user-123',
            date: date
        };

        const mockCommentRepository = new CommentRepository();
        const mockThreadRepository = new ThreadRepository();

        // Mock
        mockCommentRepository.addComment = jest.fn().mockImplementation(() => Promise.resolve(new PostedComment(mockPostedComment)));
        mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve({id: threadId}));

        const addCommentUseCase = new AddCommentUseCase({commentRepository: mockCommentRepository, threadRepository: mockThreadRepository});

        const postedComment = await addCommentUseCase.execute(threadId, newCommentPayload);

        // Assert
        expect(mockCommentRepository.addComment).toBeCalledWith(threadId, newCommentPayload);
        expect(postedComment).toStrictEqual(new PostedComment(mockPostedComment));
        expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId);
    })
});