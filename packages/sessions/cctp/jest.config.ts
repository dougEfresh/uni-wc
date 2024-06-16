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
	testMatch: [
		"<rootDir>/src/**/*.test.ts",
	]
};

export default config;
