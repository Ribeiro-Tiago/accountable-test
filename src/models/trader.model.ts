import { Schema, model, Document } from "mongoose";
import { offerSchema } from "./offer.model";

const traderSchema = new Schema({
	id: {
		type: String,
		required: true
	},
	bike: {
		type: Number,
		default: 0
	},
	book: {
		type: Number,
		default: 0
	},
	coal: {
		type: Number,
		default: 0
	},
	cheese: {
		type: Number,
		default: 0
	},
	cg: {
		type: Number,
		default: 100
	},
	lastPurchase: {
		type: String
	},
	samePurcahseInRow: {
		type: Number,
		default: 0
	},
	offers: {
		type: [offerSchema]
	}
});

export interface ITrader extends Document {
	_id: string;
	id: string;
	bikes: number;
	books: number;
	coal: number;
	cg: number;
	lastPurchase: string;
	samePurcahseInRow: number;
}

export default model("Trader", traderSchema);
