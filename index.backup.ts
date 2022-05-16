import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';

dotenv.config();

const { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER, PORT, PS_DATABASE_URL } = process.env;

const app = express();

const psPool = mysql.createPool({ queueLimit: 0, uri: PS_DATABASE_URL, waitForConnections: true });

const pool = mysql.createPool({
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    password: MYSQL_PASSWORD,
    queueLimit: 0,
    user: MYSQL_USER,
    waitForConnections: true,
});

app.use(express.json());
app.use(cors());
app.get('/api', (req: Request, res: Response) => res.send('Hello World'));
app.listen(PORT || 3000, () => console.log(`Server listening on port ${PORT || 3000}`));

app.get('/api/person/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const [rows] = await psPool.query('select * from Persons where ID = ?', [id]);

    res.json(rows);
});

const testConection = async () => {
    const connection = await pool.getConnection();
    const psConnection = await psPool.getConnection();

    await connection.ping().then(() => console.log('Database Connection Successful'));
    await psConnection.ping().then(() => console.log('PlanetScale Connection Successful'));

    connection.release();
    psConnection.release();
};

testConection();
