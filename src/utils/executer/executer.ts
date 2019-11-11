import { Response } from "express";

// tslint:disable-next-line: ban-types
export const executer = async (res: Response, func: Function, params?: string) => {
	try {
		res.json(await func(params));
	} catch (err) {
		if (err.status && err.message) {
			res.status(err.status);
			res.json(err.message);
		} else if (err === 404) {
			res.status(404);
			res.json("Resource not found");
		} else {
			res.status(500);
			res.json("Could not proccess request");
		}
	}
};
