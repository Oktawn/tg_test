import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {id: 1, name: 'John Doe', email: 'jdoe@me.com'},
        {id: 2, name: 'Geraldine Kiehn II', email: 'gk2@me.com'},
        {id: 3, name: 'Dan Emard', email: "demard@me.com"},
    ]);
};
