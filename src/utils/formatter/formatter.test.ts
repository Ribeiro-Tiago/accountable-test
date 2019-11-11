import { formatCurrency, formatKg } from "./formatter";

describe("utils/formatter/formatCurrency tests", () => {
	it("should return currency formatted when given a non-decimal currency", () => {
		expect(formatCurrency(16)).toBe("cg 16,00");
	});

	it("should return currency formatted when given a decimal number with 1 decimal", () => {
		expect(formatCurrency(160.2)).toBe("cg 160,2");
	});

	it("should return currency formatted when given a decimal number with 2 decimal", () => {
		expect(formatCurrency(16.32)).toBe("cg 16,32");
	});
});

describe("utils/formatter/formatKg tests", () => {
	it("should return non-decimal kg formatted correclty", () => {
		expect(formatKg(16)).toBe("16kg");
	});

	it("should return decimal kg formatted correclty", () => {
		expect(formatKg(16.2)).toBe("16.2kg");
	});
});
