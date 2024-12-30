/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('thread_comments', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        thread_id: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        comment_id: {
            type: 'VARCHAR(50)',
            notNull: true
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('thread_comments');
};
