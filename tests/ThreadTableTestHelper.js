/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const ThreadTableTestHelper = {
    addThread: async ({ id = 'thread-123', owner = 'user-123', title = 'new thread', body = 'this game is awesome', date = null }) => {
        if (date == null) {
            date = new Date().toISOString();
        }

        const query = {
            text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5)',
            values: [id, title, body, date, owner]
        }

        await pool.query(query);
    },

    getById: async (id) => {
        const query = {
            text: 'SELECT * FROM threads WHERE id=$1',
            values: [id]
        }

        const result = await pool.query(query);
        return result.rows;
    },

    async cleanTable() {
        await pool.query('DELETE FROM threads WHERE 1=1');
    },
}

module.exports = ThreadTableTestHelper;