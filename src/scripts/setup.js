// @ts-check
/* eslint-disable no-undef */

import fs from 'fs/promises';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });

const createDataBase = async () => {
	const dataBase = 'CREATE DATABASE IF NOT EXISTS memograph';

	const connection = await mysql.createConnection({
		user: 'root',
		host: '127.0.0.1',
		password: process.env['DATABASE_PASSWORD'],
		port: Number(process.env['DATABASE_PORT']),
	});

	await connection.execute(dataBase);
};

async function setup() {
	await createDataBase();

	const dataFolder = path.join(process.cwd(), 'data');
	await fs.mkdir(dataFolder, { recursive: true });

	const tempFilesFolder = path.join(process.cwd(), 'data/temp');
	await fs.mkdir(tempFilesFolder, { recursive: true });

	const usersFolder = path.join(process.cwd(), 'data/users');
	await fs.mkdir(usersFolder, { recursive: true });

	process.exit();
}

setup();
