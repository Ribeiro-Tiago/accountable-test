import { v4 } from "uuid";
import { Document } from "mongoose";

import Offer, { IOffer, BaseOffer } from "../models/offer.model";
import Trader, { ITrader } from "../models/trader.model";
import { ItemType } from "../models/item.model";
import { items, maxPerPerson } from "../config/rules";
import GlobalMarket, { IGlobalMarket } from "../models/globalMarket.model";
import { formatCurrency, formatKg } from "../utils/formatter/formatter";
import { calculateBuyTax } from "../utils/tax/tax";
import { updateGovtBalance } from "./government.controller";

const PAGE_SIZE = 12;

const updateBuyer = async (buyer: ITrader, item: ItemType, price: number, quantity: number, tax: number)
	: Promise<void> => {
	await checkBuyability(buyer, price, item, quantity, tax);

	buyer.cg -= (price + tax);
	buyer[item] += quantity;
	buyer.lastPurchase = item;

	buyer.save();
};

/**
 * Checks if the buyer can buy this offer, checking if he exists,
 * his balance and if he's eligible according to the rules
 */
const checkBuyability = async (buyer: ITrader, price: number, item: ItemType, quantity: number, tax: number)
	: Promise<void> => {
	if (!buyer) {
		throw {
			status: 400,
			message: "Missing buyer"
		};
	}

	if (buyer.cg < price || buyer.cg < tax) {
		throw {
			status: 400,
			message: "You don't have enough funds to make this purchase"
		};
	}

	if (item === "bike") {
		if (buyer.bike === maxPerPerson.bike) {
			throw {
				status: 400,
				message: "You can only have 2 bikes"
			};
		}

		if (buyer.lastPurchase === "bike" && buyer.samePurcahseInRow === maxPerPerson.buy_bike_in_row) {
			throw {
				status: 400,
				message: "You can't buy 2 bikes in a row"
			};
		}
	}

	if (item === "coal") {
		const global = (await GlobalMarket.findOne({ item: "coal" })) as IGlobalMarket & Document;
		const maxCoalPerPerson = global.quantity * maxPerPerson.coal;

		if (buyer.coal + quantity > maxCoalPerPerson) {
			throw {
				status: 400,
				message: `You cannot have more than 10% of the global coal market ${formatKg(maxCoalPerPerson)}`
			};
		}
	}
};

const updateSeller = async (id: string, item: ItemType, price: number, quantity: number): Promise<void> => {
	await Trader.findOneAndUpdate({ id }, {
		$inc: {
			cg: price,
		},
		$dec: {
			[item]: quantity
		}
	});
};

export const listOffers = async (page: number = 1): Promise<IOffer[]> => {
	const skip = page > 1
		? (page - 1) * PAGE_SIZE + 1
		: 0;

	const result = await Offer
		.find({}, { _id: 0, __v: 0 }, { skip })
		.limit(page * PAGE_SIZE);

	return result.map((t: any) => {
		const doc = t._doc;

		return {
			...doc,
			price: formatCurrency(doc.price),
			qtyDisplay: (doc.type === "kg")
				? formatKg(doc.quantity)
				: doc.quantity
		};
	});
};

export const offerDetails = async (id: string): Promise<IOffer> => {
	const result = (await Offer
		.findOne({ id }, { _id: 0, __v: 0 })) as IOffer & Document;

	if (!result) {
		throw 404;
	}

	return {
		...result,
		priceDisplay: formatCurrency(result.price),
		qtyDisplay: (result.type === "kg")
			? formatKg(result.quantity)
			: result.quantity.toString()
	};
};

export const createOffer = async ({ item, owner, price, quantity }: BaseOffer) => {
	if (!item || !owner || !price || !quantity || !items.includes(item)) {
		throw {
			status: 400,
			message: "Invalid offer"
		};
	}

	return (await new Offer({
		id: v4(),
		item,
		owner,
		price,
		quantity
	}).save() as IOffer & Document);
};

/**
 * TODO: look into making this a transaction
 */
export const acceptOffer = async (offerId: string, buyerId: string) => {
	const details = (await Offer.findOne({ id: offerId })) as IOffer & Document;

	if (!details) {
		throw 404;
	}

	const { item, owner, price, quantity } = details;

	if (buyerId === owner) {
		throw {
			status: 400,
			message: "You can't buy your own offers"
		};
	}

	const buyer = (await Trader.findOne({ id: offerId })) as ITrader;
	const tax = calculateBuyTax(item, price, buyer.coal);
	await updateBuyer(buyer, item, price, quantity, tax);
	await updateSeller(owner, item, price, quantity);
	await Offer.findOneAndRemove({ id: offerId });
	await updateGovtBalance(tax);
};
