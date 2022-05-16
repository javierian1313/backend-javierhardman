import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { testConnection } from './mysql';
// import { psPool, testPsConnection } from './planetScale';

dotenv.config();

testConnection();
// testPsConnection();

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());
app.listen(PORT || 3000, () => console.log(`Server listening on port ${PORT || 3000}`));

app.get('/api', (req: Request, res: Response) => res.send('Hello World'));

// app.get('/api/person/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const [rows] = await psPool.query('select * from Persons where ID = ?', [id]);

//     res.json(rows);
// });
