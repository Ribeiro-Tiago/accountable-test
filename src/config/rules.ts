export default {
	currencies: {
		coal: "kg",
		cheese: "kg",
		book: "quantity",
		bike: "quantity"
	},
	max_per_person: {
		coal: .1,
		bike: 2,
		buy_bike_in_row: 2,
		sell_book_in_row: 3,
	},
	buy: {
		coal: .75,
		cheese: .15,
		bike: .15,
		book: 0
	},
	sell: {
		coal: .15,
		cheese: .05,
		bike: .05,
		book: .05
	},
	ownage: {
		coal_per_bike: -.05,
		coal_per_bike_limit: 0,
		book_per_coal: .05,
		book_per_coal_limit: .5,
	}
};
