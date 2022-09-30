import { connection } from '../db/database.js';

async function getCategories (req, res) {
    try {
        const categories = await connection.query('SELECT * FROM categories;');
        res.send(categories.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function postCategory (req, res) {
    const name = res.locals.name.result;
    try {
        await connection.query('INSERT INTO categories (name) VALUES ($1);', [name]);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

export { getCategories, postCategory };