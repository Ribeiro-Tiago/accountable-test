import { calculateBuyTax, calculateSellTax } from "./tax";

describe("utils/tax/calculateSellTax tests", () => {
	it("should calculate tax for special items without bonus based on the rules", () => {
		expect(calculateSellTax("coal", 30, 0)).toBe(4.5);
	});

	it("should calculate tax for special items with bonus based on the rules", () => {
		expect(calculateSellTax("coal", 30, 2)).toBe(1.5);
	});

	it("should calculate tax for special items with all bonus based on the rules", () => {
		expect(calculateSellTax("coal", 30, 3)).toBe(0);
	});

	it("should calculate tax for non special items without bonus based on the rules", () => {
		expect(calculateSellTax("cheese", 50, 0)).toBe(2.5);
	});

	it("should calculate tax for non special items with bonus based on the rules", () => {
		expect(calculateSellTax("cheese", 1000, 3)).toBe(50);
	});
});

describe("utils/tax/calculateBuyTax tests", () => {
	it("should calculate the tax for non special items based on the rules", () => {
		expect(calculateBuyTax("bike", 10, 0)).toBe(1.5);
	});

	it("should calculate the tax for special items based on the rules", () => {
		expect(calculateBuyTax("book", 20, 3)).toBe(3);
	});
});
