import dotenv from 'dotenv';

dotenv.config();

const config = {
	server: {
		port: process.env.SERVER_PORT,
	},
	database: {
		name: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
	},
	redis: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		password: process.env.REDIS_PASS,
	},
};

export default config;