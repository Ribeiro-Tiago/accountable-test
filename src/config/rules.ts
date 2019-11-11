export const items = [
	"book",
	"bike",
	"cheese",
	"coal"
];

export const currencies = {
	coal: "kg",
	cheese: "kg",
	book: "quantity",
	bike: "quantity"
};

export const maxPerPerson = {
	coal: .1,
	bike: 2,
	buy_bike_in_row: 2,
	sell_book_in_row: 3,
};

export const buy = {
	coal: .75,
	cheese: .15,
	bike: .15,
	book: 0
};

export const sell = {
	coal: .15,
	cheese: .05,
	bike: .05,
	book: .05
};

export const ownage = {
	coal_per_bike: -.05,
	coal_per_bike_limit: 0,
	book_per_coal: .05,
	book_per_coal_limit: .5,
};
