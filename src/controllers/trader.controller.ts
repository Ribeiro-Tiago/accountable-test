import { v4 } from "uuid";

import Trader, { ITrader } from "../models/trader.model";
import { formatCurrency } from "../utils/formatter/formatter";

const PAGE_SIZE = 30;

export const createTrader = async (): Promise<ITrader> => {
	return (await new Trader({ id: v4() }).save() as ITrader);
};

export const listTraders = async (page: number = 1): Promise<ITrader[]> => {
	const skip = page > 1
		? (page - 1) * PAGE_SIZE + 1
		: 1;

	const result = await Trader
		.find({}, { _id: 0, __v: 0 }, { skip })
		.limit(page * PAGE_SIZE);

	return result.map((t: any) => ({
		...t._doc,
		cg: formatCurrency(t._doc.cg)
	}));
};

export const traderDetails = async (id: string): Promise<ITrader> => {
	const result = await Trader
		.findOne({ id }, { _id: 0, __v: 0 }) as any;

	if (!result) {
		throw 404;
	}

	return {
		...result._doc,
		cg: formatCurrency(result._doc.cg)
	};
};
