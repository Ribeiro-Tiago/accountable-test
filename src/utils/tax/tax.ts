import { ItemType } from "../../models/item.model";
import { buyTax, ownerTaxes, sellTax } from "../../config/rules";

export const calculateBuyTax = (item: ItemType, price: number, buyerCoal: number): number => {
	const tax = buyTax[item];
	let value = 0;

	if (tax) {
		value = price * tax;

		if (item === "book") {
			let coalOwnerTax = ownerTaxes.book_per_coal * Math.floor(buyerCoal) / 10;

			if (coalOwnerTax > ownerTaxes.book_per_coal_limit) {
				coalOwnerTax = .5;
			}

			value += price * coalOwnerTax;
		}
	}

	return value;
};

export const calculateSellText = (item: ItemType, price: number, buyerBike: number): number => {
	let tax = sellTax[item];
	let value = 0;

	if (tax) {
		if (item === "coal") {
			tax -= ownerTaxes.coal_per_bike * buyerBike / 10;
		}

		value = (tax > 0)
			? price * tax
			: price;
	}

	return value;
};
