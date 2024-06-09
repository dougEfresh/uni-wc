import type {Config} from 'jest';

const config: Config = {
	verbose: true,
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	preset: "ts-jest",
	rootDir: "./",
	testEnvironment: "node",
	modulePaths: ["<rootDir>"],
	detectLeaks: false,
	detectOpenHandles: false,
	testTimeout: 30000,
	testMatch: [
		"<rootDir>/integration/*.test.ts",
	]
};

export default config;
