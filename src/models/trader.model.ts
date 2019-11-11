import { Schema, model, Document } from "mongoose";

const traderSchema = new Schema({
	id: {
		type: String,
		required: true
	},
	bikes: {
		type: Number,
		default: 0
	},
	books: {
		type: Number,
		default: 0
	},
	coal: {
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
