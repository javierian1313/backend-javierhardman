import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const { PS_DATABASE_URL } = process.env;

export const psPool = mysql.createPool({ queueLimit: 0, uri: PS_DATABASE_URL, waitForConnections: true });

export const testPsConnection = async () => {
    const connection = await psPool.getConnection();

    await connection.ping().then(() => console.log('PlanetScale Connection Successful'));

    connection.release();
};
