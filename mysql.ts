import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER } = process.env;

export const pool = mysql.createPool({
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    password: MYSQL_PASSWORD,
    queueLimit: 0,
    user: MYSQL_USER,
    waitForConnections: true,
});

export const testConnection = async () => {
    const connection = await pool.getConnection();

    await connection.ping().then(() => console.log('Database Connection Successful'));

    connection.release();
};
