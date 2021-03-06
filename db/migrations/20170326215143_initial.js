exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.string('avatar', 150).nullable();
      table.string('token',300).nullable();
      table.integer('resume_id').references('resume.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable().unique();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id');
    }),
    knex.schema.createTableIfNotExists('applied_jobs', function(table) {
      table.increments('id').unsigned().primary();
      table.string('status').notNullable();
      table.string('job_data', 5000).notNullable();
      table.string('applied_id').unique();
      table.integer('user_id').references('auths.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('jobs', function(table) {
      table.increments('id').unsigned().primary();
      table.string('title', 100).notNullable();
      table.string('description', 5000).nullable();
      table.string('url', 700).nullable();
      table.string('top_ten', 50).nullable();
      table.integer('company_name').references('company.id');
      table.string('formatted_time', 100).nullable();
      table.string('formatted_location', 200).nullable();
      table.string('company', 100).nullable();
      table.string('city', 100).nullable();
      table.string('location', 100).nullable();
      table.string('date', 100).nullable();
    }),
    knex.schema.createTableIfNotExists('resume', function(table) {
      table.increments('id').unsigned().primary();
      table.string('location', 100).nullable();
      table.string('skills', 5000).nullable();
      table.string('keywords', 5000).nullable();
      table.string('resume_url', 200).nullable();
      // table.integer('resumeUser_id').references('auths.id');
    }),
    knex.schema.createTableIfNotExists('company', function(table) {
      table.increments('id').unsigned().primary();
      table.string('name', 100).nullable();
      table.string('employees', 1000).nullable();
      table.string('salary', 100).nullable();
      table.string('worklife', 100).nullable();
      table.string('culture', 100).nullable();
      table.string('url', 100).nullable();
      table.string('headline', 100).nullable();
    }),
    
    knex.schema.createTableIfNotExists('hash_table', function(table) {
      table.increments('id').unsigned().primary();
      table.string('table', 100000).nullable();
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('profiles'),
    knex.schema.dropTable('applied_jobs'),
    knex.schema.dropTable('jobs'),
    knex.schema.dropTable('resume'),
    knex.schema.dropTable('company'),

  ]);
};
