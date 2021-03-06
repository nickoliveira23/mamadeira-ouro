
exports.up = function (knex) {
    return knex.schema.createTable('collaborator', function (table) {
        table.increments('id');
        table.string('name').notNullable();

        table.integer('id_user').references('user.id').notNullable().onDelete('CASCADE');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('collaborator');
};
