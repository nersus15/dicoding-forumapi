/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    // Comments
    pgm.addConstraint('comments', 'fk_comments.owner', {
        foreignKeys: {
            columns: 'owner',
            references: 'users(id)',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    });

    pgm.addConstraint('comments', 'fk_comments.thread_id', {
        foreignKeys: {
            columns: 'thread_id',
            references: 'threads(id)',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    });

    // Threads
    pgm.addConstraint('threads', 'fk_threads.owner', {
        foreignKeys: {
            columns: 'owner',
            references: 'users(id)',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    });

    // Replies
    pgm.addConstraint('comment_replies', 'fk_comment_replies.comment', {
        foreignKeys: {
            columns: 'comment_id',
            references: 'comments(id)',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    });

    pgm.addConstraint('comment_replies', 'fk_comment_replies.reply', {
        foreignKeys: {
            columns: 'reply_id',
            references: 'comments(id)',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    });
};

exports.down = pgm => {
     // Comments
     pgm.dropConstraint('comments', 'fk_comments.owner');
     pgm.dropConstraint('comments', 'fk_comments.thrad_id');

    // Threads
    pgm.dropConstraint('threads', 'fk_threads.owner');
    
    // Replies
    pgm.dropConstraint('comment_replies', 'fk_comment_replies.comment');
    pgm.dropConstraint('comment_replies', 'fk_comment_replies.reply');
};
