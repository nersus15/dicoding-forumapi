/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const CommentsTableTestHelper = {
    addComment: async ({ id = 'comment-123', owner = 'user-123', thread_id = 'thread-123', content = 'new comment', date = null }) => {
        if (date == null) {
            date = new Date().toISOString();
        }

        const query = {
            text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5)',
            values: [id, content, thread_id, date, owner]
        }

        await pool.query(query);
    },

    getById: async (id) => {
        const query = {
            text: 'SELECT * FROM comments WHERE id=$1',
            values: [id]
        }

        const result = await pool.query(query);
        
        return result.rows;
    },

    async cleanTable() {
        await pool.query('DELETE FROM comments WHERE 1=1');
    },
}

module.exports = CommentsTableTestHelper;