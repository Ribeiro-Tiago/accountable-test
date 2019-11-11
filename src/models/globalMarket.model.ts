import { Schema, model } from "mongoose";
import { ItemType } from "./item.model";

export const globalMarketSchema = new Schema({
	item: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	}
});

export interface IGlobalMarket {
	_id: string;
	quantity: number;
	item: ItemType;
}

export default model("GlobalMarket", globalMarketSchema);
