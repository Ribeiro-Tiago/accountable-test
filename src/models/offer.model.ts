import { Schema, model } from "mongoose";

export const offerSchema = new Schema({
	id: {
		type: String,
		required: true
	},
	item: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	owner: {
		type: String,
		required: true
	}
});

export type OfferItem = "book" | "bike" | "coal" | "cheese";

export type ItemPresentation = "kg" | "numeric";

export interface BaseOffer {
	id: string;
	item: OfferItem;
	quantity: number;
	price: number;
	owner: string;
}
export interface IOffer extends BaseOffer {
	_id: string;
	type: ItemPresentation;
	qtyDisplay: string;
	priceDisplay: string;
}

export default model("Offer", offerSchema);
