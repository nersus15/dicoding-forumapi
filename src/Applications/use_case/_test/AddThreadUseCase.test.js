const NewThread = require("../../../Domains/threads/entities/NewThread");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const AddThreadUseCase = require("../AddThreadUseCase");

describe('AddThreadUseCase', () => {
    it('should orchestrating the add thread action correctly', async () => {
        // Arrange
        const newThreadPayload = {
            owner: 'user-123',
            title: 'new thread',
            body: 'the game is awesome'
        };
        const date = new Date().toISOString();

        const mockPostedThred = {
            id: 'thread-123',
            date: date,
            ...newThreadPayload
        };

        const mockThreadRepository = new ThreadRepository();

        // Mock
        mockThreadRepository.addThread = jest.fn().mockImplementation(() => Promise.resolve(mockPostedThred));

        const addThreadUseCase = new AddThreadUseCase({
            threadRepository: mockThreadRepository
        });

        const poestedThread = await addThreadUseCase.execute(newThreadPayload);

        // Assert
        expect(mockThreadRepository.addThread).toBeCalledWith(new NewThread(newThreadPayload));
        expect(poestedThread).toStrictEqual(mockPostedThred);
    });
});