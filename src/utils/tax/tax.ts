import { ItemType } from "../../models/item.model";
import { buyTax, ownerTaxes, sellTax } from "../../config/rules";

export const calculateBuyTax = (item: ItemType, price: number, buyerCoal: number): number => {
	const tax = buyTax[item];
	let value = 0;

	if (tax || tax === 0) {
		value = price * tax;

		if (item === "book") {
			let coalOwnerTax = ownerTaxes.book_per_coal * Math.floor(buyerCoal);

			if (coalOwnerTax > ownerTaxes.book_per_coal_limit) {
				coalOwnerTax = .5;
			}

			value += Number((price * coalOwnerTax).toFixed(2));
		}
	}

	return value;
};

export const calculateSellTax = (item: ItemType, price: number, buyerBike: number): number => {
	let tax = sellTax[item];
	let value = 0;

	if (tax) {
		if (item === "coal") {
			tax -= ownerTaxes.coal_per_bike * buyerBike;
		}

		value = (tax > 0)
			? price * tax
			: 0;
	}

	return Number(value.toFixed(2));
};
