import Trader, { ITrader } from "../models/trader.model";
import { formatCurrency } from "../utils/formatter/formatter";

export const createGovt = async (): Promise<number> => {
	return (await new Trader({ id: "government" }).save() as ITrader).cg;
};

export const getGovtBalance = async (): Promise<string> => {
	const govt = await Trader.findOne({ id: "government" }, { _id: 0, cg: 1 }) as ITrader;

	if (!govt) {
		return formatCurrency(await createGovt());
	}

	return formatCurrency(govt.cg);
};
