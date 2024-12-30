const ThreadTableTestHelper = require("../../../../tests/ThreadTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const NewThread = require("../../../Domains/threads/entities/NewThread");
const pool = require("../../database/postgres/pool");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");

describe('ThreadRespositoryPostgres', () => {
    afterAll(async () => {        
        await ThreadTableTestHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
        pool.end();
    });

    describe('addThread function', () => {
        it('should persist post thread and return posted thread correctly', async () => {
            // First Create User
            await UsersTableTestHelper.addUser({ id: 'user-12345', username: 'dev' });

            const newThread = new NewThread({
                owner: 'user-12345',
                title: 'new thread',
                body: 'this game is awesome'
            });

            const fakeIdGenerator = () => '123';
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            // Act
            await threadRepositoryPostgres.addThread(newThread);

            // Assert
            const postedThread = await ThreadTableTestHelper.getById('thread-123');
            
            expect(postedThread).toHaveLength(1);

        });

        it('should return posted thread correctly', async () => {
            // First Create User
            await UsersTableTestHelper.addUser({ id: 'user-123456', username: 'dev2' });

            const newThread = new NewThread({
                owner: 'user-12345',
                title: 'new thread',
                body: 'this game is awesome'
            });

            const fakeIdGenerator = () => '1234';
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            // Act
            const postedThread = await threadRepositoryPostgres.addThread(newThread);

            // Assert
            expect(postedThread).toStrictEqual({
                id: 'thread-1234',
                title: newThread.title,
                body: newThread.body,
                owner: newThread.owner,
            });
        });
    })
});