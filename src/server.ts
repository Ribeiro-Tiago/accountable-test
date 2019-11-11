import { server, env } from "./config/config";
import app from "./config/express";
import "./config/mongoose";

app.listen(
	server.port,
	server.host,
	() => console.info(`Server started ${server.host}:${server.port} (${env})`)
);

export default app;
