const hasDecimal = (num: number): boolean => num % 1 !== 0;

export const formatCurrency = (curr: number): string => {
	if (!hasDecimal(curr)) {
		return `cg ${curr},00`;
	}

	return `cg ${curr.toString().replace(".", ",")}`;
};

export const formatKg = (qty: number): string => `${qty}kg`;
