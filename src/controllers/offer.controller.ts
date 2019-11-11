import { v4 } from "uuid";
import { Document } from "mongoose";

import Offer, { IOffer, BaseOffer, OfferItem } from "../models/offer.model";
import Trader, { ITrader } from "../models/trader.model";
import { formatCurrency, formatKg } from "../utils/formatter/formatter";
import { items } from "../config/rules";

const PAGE_SIZE = 12;

const updateBuyer = async (id: string, item: OfferItem, price: number, quantity: number): Promise<void> => {
	const buyer = (await Trader.findOne({ id })) as ITrader;

	if (!buyer) {
		throw {
			status: 400,
			message: "Missing buyer"
		};
	}

	if (buyer.cg < price) {
		throw {
			status: 400,
			message: "You don't have enough funds to make this purchase"
		};
	}

	buyer.cg -= price;
	buyer[item] += quantity;

	buyer.save();
};

const updateSeller = async (id: string, item: OfferItem, price: number, quantity: number): Promise<void> => {
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

	await updateBuyer(buyerId, item, price, quantity);
	await updateSeller(owner, item, price, quantity);
	await Offer.findOneAndRemove({ id: offerId });
};
