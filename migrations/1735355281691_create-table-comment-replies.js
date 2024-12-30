/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('comment_replies', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        comment_id: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        reply_id: {
            type: 'VARCHAR(50)',
            notNull: true
        } 
    });
};

exports.down = pgm => {
    pgm.dropTable('comment_replies');
};
