const PostedComment = require("../postedComment");

describe('a PostedComment entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {
            id: 'comment-123',
            content: 'new comment',
            date: new Date().toISOString()
        }

        expect(() => new PostedComment(payload)).toThrowError('POSTED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        const payload = {
            id: 'comment-123',
            content: 'new comment',
            owner: 123,
            date: new Date().toISOString(),
        };

        expect(() => new PostedComment(payload)).toThrowError('POSTED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create PostedComment object correctly', () => {
        const payload = {
            id: 'comment-123',
            content: 'new comment',
            owner: 'user-123',
            date: new Date().toISOString()
        };

        const postedComment = new PostedComment(payload);

        expect(postedComment.id).toEqual(payload.id);
        expect(postedComment.content).toEqual(payload.content);
        expect(postedComment.owner).toEqual(payload.owner);
        expect(postedComment.date).toEqual(payload.date);
    })
});