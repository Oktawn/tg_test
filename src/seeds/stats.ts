import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("stats").del();

    // Inserts seed entries
    await knex.table("stats").insert([
        {name: "test", value: 7},
        {name: "test2", value: 8},
        {name: "test3", value: 9},
    ]);
};
