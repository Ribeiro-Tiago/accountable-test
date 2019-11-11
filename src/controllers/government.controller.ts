import Trader, { ITrader } from "../models/trader.model";
import { formatCurrency } from "../utils/formatter/formatter";

const GOVT_ID = "government";

export const createGovt = async (): Promise<number> => {
	return (await new Trader({ id: GOVT_ID }).save() as ITrader).cg;
};

export const getGovtBalance = async (): Promise<string> => {
	const govt = await Trader.findOne({ id: GOVT_ID }, { _id: 0, cg: 1 }) as ITrader;

	if (!govt) {
		return formatCurrency(await createGovt());
	}

	return formatCurrency(govt.cg);
};

export const updateGovtBalance = async (balance: number): Promise<void> => {
	await Trader.findOneAndUpdate({ id: GOVT_ID }, {
		$inc: {
			cg: balance,
		}
	});
};
