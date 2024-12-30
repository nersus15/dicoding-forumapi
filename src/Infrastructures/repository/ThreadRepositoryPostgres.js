const ThreadRepository = require("../../Domains/threads/ThreadRepository");

class ThreadRepositoryPostgres extends ThreadRepository{
    constructor(pool, idGenerator){
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async addThread(payload){
        const {title, body, owner} = payload;
        const id = `thread-${this._idGenerator()}`;
        const date = new Date().toISOString();
        
        const query = {
            text: 'INSERT INTO threads VALUES ($1, $2, $3, $4, $5) RETURNING id, title, body, owner',
            values: [id, title, body, date, owner]
        }
        const result = await this._pool.query(query);
        return {...result.rows[0]};
    }
}

module.exports = ThreadRepositoryPostgres;