const CommentsTableTestHelper = require("../../../../tests/CommentsTableTestHelper");
const ThreadTableTestHelper = require("../../../../tests/ThreadTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const PostedComment = require("../../../Domains/comments/entities/postedComment");
const pool = require("../../database/postgres/pool");
const CommentRepositoryPostgres = require("../CommentRepositoryPostgres");

describe('CommentRepositoryPostgres', () => {
    describe('addComment function', () => {
        afterAll(async () => {        
            await CommentsTableTestHelper.cleanTable();
            await ThreadTableTestHelper.cleanTable();
            await UsersTableTestHelper.cleanTable();
            pool.end();
        });

        afterEach(async() => {
            await CommentsTableTestHelper.cleanTable();
        });

        beforeAll( async () => {
            await UsersTableTestHelper.addUser({ id: 'user-12345', username: 'dev' });
            await ThreadTableTestHelper.addThread({id: 'thread-123', owner: 'user-12345'});
        });

        it('should persist add comment and return added comment correctly', async () => {
            const date = new Date().toISOString();
            const threadId ='thread-123';
            
            const requestPayload =  {
                owner: 'user-12345',
                content: 'new comment',
                date: date
            };

            const fakeIdGenerator = () => '123';
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            // act
            await commentRepositoryPostgres.addComment(threadId, requestPayload);
            const postedComment = await CommentsTableTestHelper.getById('comment-123');

            // Assert
            expect(postedComment).toHaveLength(1);
        });

        it('should return posted comment correctly', async () => {
            const date = new Date().toISOString();
            const threadId ='thread-123';

            const requestPayload =  {
                owner: 'user-12345',
                content: 'new comment',
                date: date
            };

            const fakeIdGenerator = () => '123';
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            // act
            const postedComment = await commentRepositoryPostgres.addComment(threadId, requestPayload);

            // Assert
            expect(postedComment).toBeInstanceOf(PostedComment);
            expect(postedComment).toStrictEqual(new PostedComment({
                id: 'comment-123',
                content: 'new comment',
                owner: 'user-12345',
                date: date
            }));


        });
    });
});