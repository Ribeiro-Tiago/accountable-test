export const items = [
	"book",
	"bike",
	"cheese",
	"coal"
];

export const maxPerPerson = {
	coal: .1,
	bike: 2,
	buy_bike_in_row: 1,
	sell_book_in_row: 2,
};

export const buyTax = {
	coal: .75,
	cheese: .15,
	bike: .15,
	book: 0
};

export const sellTax = {
	coal: .15,
	cheese: .05,
	bike: .05,
	book: .05
};

export const ownerTaxes = {
	coal_per_bike: .05,
	coal_per_bike_limit: 0,
	book_per_coal: .05,
	book_per_coal_limit: .5,
};
