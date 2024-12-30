const NewThread = require("../NewThread");

describe('a NewThread entity', () => {
    it('should throw error when payload not contain needed propery', () => {
        const payload = {
            owner: 'user-123',
            title: 'new thread'
        };

        expect(() => new NewThread(payload)).toThrowError('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload not meet data type specification', () => {
        const payload = {
            owner: 'user-123',
            title: 'new thread',
            body: 123
        }

        expect(() => new NewThread(payload)).toThrowError('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create NewThread entities correctly', () => {
        const payload = {
            owner: 'user-123',
            title: 'new thread',
            body: 'this game is awesome'
        };

        const newThread = new NewThread(payload);

        expect(newThread).toBeInstanceOf(NewThread);
        expect(newThread.title).toEqual(payload.title);
        expect(newThread.body).toEqual(payload.body);
        expect(newThread.owner).toEqual(payload.owner);
    });
});