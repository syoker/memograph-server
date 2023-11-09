import dotenv from 'dotenv';
import { Sequelize, DataTypes, Model, type Optional } from 'sequelize';

dotenv.config({ path: './.env.local' });

const sequelize = new Sequelize('memograph', 'root', process.env['DATABASE_PASSWORD'], {
	host: 'localhost',
	port: Number(process.env['DATABASE_PORT']),
	dialect: 'mysql',
});

interface AccountAttributes {
	id: number;
	user: string;
	name: string;
	password: string;
	picture: string | null;
	sessionAuth: string;
}

type AccountCreationAttributes = Optional<AccountAttributes, 'id' | 'picture'>;

export class Account extends Model<AccountAttributes, AccountCreationAttributes> {
	declare id: number;
	declare user: string;
	declare name: string;
	declare password: string;
	declare picture: string | null;
	declare sessionAuth: string;
}

Account.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		user: {
			type: DataTypes.STRING(64),
			unique: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		picture: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		sessionAuth: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'accounts',
	},
);

(async () => {
	try {
		await sequelize.sync();
		console.log('connection has been established successfully.');
	} catch (error) {
		console.error('unable to connect to the database:', error);
	}
})();
