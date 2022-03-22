
exports.up = function (knex) {
    return knex.schema.createTable('user', function (table) {
        table.increments('id');
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('type');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('user');
};