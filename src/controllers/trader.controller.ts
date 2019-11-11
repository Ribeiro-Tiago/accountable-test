import { v4 } from "uuid";

import Trader, { ITrader } from "../models/trader.model";

export const createTrader = async (): Promise<ITrader> => {
	return (await new Trader({ id: v4() }).save() as ITrader);
};
