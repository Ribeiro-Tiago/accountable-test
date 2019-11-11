import * as dotenv from "dotenv";

dotenv.config();

export const isDev = process.env.NODE_ENV === "development";

export const env = process.env.NODE_ENV;

export const server = {
	port: (process.env.SERVER_PORT || 3000) as number,
	host: process.env.SERVER_HOST || "localhost",
};

export const db = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT
};
