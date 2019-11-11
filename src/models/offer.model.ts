import { Schema, model, Document } from "mongoose";

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
	}
});

export type OfferItem = "Book" | "Bike" | "Coal";

export interface IOffer extends Document {
	item: OfferItem;
	quantity: number;
	price: number;
}

export default model("Offer", offerSchema);
