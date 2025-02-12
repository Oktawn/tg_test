import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("stats", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("value").notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('stats');
}

