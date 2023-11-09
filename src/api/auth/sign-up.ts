import { hash } from 'bcrypt';
import { type Request, type Response } from 'express';

import path from 'path';
import fs from 'fs/promises';
import formidable from 'formidable';

import { Account } from 'api/db.js';

export const config = {
	api: {
		bodyParser: false,
	},
};

type AccountProps = {
	user: string[];
	password: string[];
};

export default function authSignUp(req: Request, res: Response) {
	if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });

	const form = formidable();

	return form.parse(req, async (err, fields) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: 'internal server error' });
		}

		const {
			user: [user],
			password: [password],
		} = fields as AccountProps;

		try {
			const existingUser = await Account.findOne({ where: { user } });
			if (existingUser !== null) return res.status(409).json({ error: 'user already exists' });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: 'internal server error' });
		}

		const userFolder = path.join(process.cwd(), 'data/users', user);
		await fs.mkdir(userFolder, { recursive: true });

		const userArtistsFolder = path.join(process.cwd(), 'data/users', user, 'photos');
		await fs.mkdir(userArtistsFolder, { recursive: true });

		const sessionAuth = Date.now() * Number(process.env['SESSION_AUTH_MULTIPLIER']);
		const encodedSessionAuth = await hash(sessionAuth.toString(), Number(process.env['AMOUNT_HASH_SALT']));
		const encodedPassword = await hash(password, Number(process.env['AMOUNT_HASH_SALT']));

		try {
			await Account.create({
				user: user,
				name: user,
				password: encodedPassword,
				sessionAuth: encodedSessionAuth,
			});
			return res.status(200).json({ registered: true });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: 'internal server error' });
		}
	});
}
