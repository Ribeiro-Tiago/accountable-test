module.exports = {
	verbose: true,
	testEnvironment: "node",
	moduleFileExtensions: [
		"js",
		"ts",
		"tsx"
	],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest"
	},
	globals: {
		"ts-jest": {
			"tsConfigFile": "tsconfig.json"
		}
	},
	testMatch: [
		"**/*.test.ts"
	],
	collectCoverage: true,
	collectCoverageFrom: [
		"./src/routes/**/*.{ts,tsx}",
		"./src/controllers/**/*.{ts,tsx}",
		"./src/utils/**/*.{ts,tsx}",
		"./src/services/**/*.{ts,tsx}",
		"!**/node_modules/**"
	],
	coverageDirectory: "./coverage"
};
