const CommentRepository = require("../../Domains/comments/CommentRepository");
const PostedComment = require("../../Domains/comments/entities/postedComment");

class CommentRepositoryPostgres extends CommentRepository {
    constructor(pool, idGenerator){
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async addComment(threadId, payload){
        const {content, date, owner} = payload;
        const id = `comment-${this._idGenerator()}`;

        const query = {
            text: 'INSERT INTO comments VALUES ($1, $2, $3, $4, $5) RETURNING id, content, date, owner',
            values: [id, content, threadId, date, owner]
        }
        const result = await this._pool.query(query);
        return new PostedComment({...result.rows[0]});
    }
}

module.exports = CommentRepositoryPostgres;