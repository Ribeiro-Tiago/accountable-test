import { Schema, model, Document } from "mongoose";

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
	}
});

export interface ITrader extends Document {
	_id: string;
	id: string;
	bike: number;
	book: number;
	cheese: number;
	coal: number;
	cg: number;
	lastPurchase: string;
	samePurcahseInRow: number;
}

export default model("Trader", traderSchema);
