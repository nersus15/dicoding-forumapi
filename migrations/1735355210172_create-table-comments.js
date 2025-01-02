/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('comments', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        content: {
            type: 'TEXT',
            notNull: true
        },
        thread_id: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        date: {
            type: 'TEXT',
            notNull: true
        },
        owner: {
            type: 'VARCHAR(50)',
            notNull: true
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('comments');
};
