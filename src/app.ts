import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: './.env.local' });

import authSignUp from 'api/auth/sign-up.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/data'));

app.post('/api/auth/sign-up', (req, res) => authSignUp(req, res));

app.listen(process.env['SERVER_PORT'], () => {
	console.log(`server running on http://localhost:${process.env['SERVER_PORT']}/`);
});
