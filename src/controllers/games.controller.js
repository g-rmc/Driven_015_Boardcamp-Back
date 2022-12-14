import { connection } from '../db/database.js';

async function getGames (req,res) {
    const filter = res.locals.filter;
    try {
        const games = await connection.query(
            `SELECT games.*, categories.name AS "categoryName"
            FROM games JOIN categories ON games."categoryId" = categories.id
            WHERE LOWER(games.name) LIKE $1;`,
            [filter+'%']
        );
        res.send(games.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}

async function postGame (req,res) {
    const { name, image, stockTotal, categoryId, pricePerDay} = res.locals.gameObj;
    try {
        await connection.query(
            `INSERT INTO games
            (name, image, "stockTotal", "categoryId", "pricePerDay")
            VALUES
            ($1, $2, $3, $4, $5)`,
            [name, image, stockTotal, categoryId, pricePerDay]
        );
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export { getGames, postGame };