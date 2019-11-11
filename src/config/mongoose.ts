import { connect } from "mongoose";

import { db } from "./config";

connect(`mongodb://${db.host}:${db.port}`, {
	keepAlive: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: "accountable",
	appname: "accountable",
	poolSize: 20,
	family: 4,
	socketTimeoutMS: 45000,
})
	.then(() => console.log("Database connection successful"))
	.catch((err) => { throw new Error("Unable to connect to database: " + err); });
