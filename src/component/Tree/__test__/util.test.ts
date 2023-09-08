import { describe, expect, test } from 'vitest';
import {
	getFlatTNodeTree,
	getTNodeTree,
	isArray,
	isBoolean,
	isNumber,
	isObject,
	isString,
	mapUnknownToTNode,
} from '../util';
import { TNodeObject, TNodeValue } from '../types';

const mockData: unknown = {
	date: '2021-10-27T07:49:14.896Z',
	hasError: false,
	fields: [
		{
			id: '4c212130',
			prop: 'iban',
			value: 'DE81200505501265402568',
			hasError: false,
		},
	],
	test: {
		some: 'value',
		other: 'value',
	},
};
const expectedFlatData: TNodeValue[] = [
	{ path: 'res.date', value: '2021-10-27T07:49:14.896Z' },
	{ path: 'res.hasError', value: false },
	{ path: 'res.fields[0].id', value: '4c212130' },
	{ path: 'res.fields[0].prop', value: 'iban' },
	{ path: 'res.fields[0].value', value: 'DE81200505501265402568' },
	{ path: 'res.fields[0].hasError', value: false },
	{ path: 'res.test.some', value: 'value' },
	{ path: 'res.test.other', value: 'value' },
];

const expectedData: TNodeObject = {
	date: { path: 'res.date', value: '2021-10-27T07:49:14.896Z' },
	hasError: { path: 'res.hasError', value: false },
	fields: [
		{
			hasError: { path: 'res.fields[0].hasError', value: false },
			id: { path: 'res.fields[0].id', value: '4c212130' },
			prop: { path: 'res.fields[0].prop', value: 'iban' },
			value: { path: 'res.fields[0].value', value: 'DE81200505501265402568' },
		},
	] as TNodeObject[],
	test: {
		some: { path: 'res.test.some', value: 'value' },
		other: { path: 'res.test.other', value: 'value' },
	},
};

describe('getFlatTNodeTree', () => {
	test('Should return flatten tree', () => {
		console.log('expectedFlatData', getFlatTNodeTree(mockData));
		expect(getFlatTNodeTree(mockData)).toEqual(expectedFlatData);
	});
});

describe('getTNodeTree', () => {
	test('Should map unknown json to tree with path variable', () => {
		expect(getTNodeTree(mockData)).toEqual(expectedData);
	});
});

describe('mapUnknownToTNode', () => {
	test('Should map object to TNode', () => {
		expect(mapUnknownToTNode('res.date', '2021-10-27T07:49:14.896Z')).toEqual({
			path: 'res.date',
			value: '2021-10-27T07:49:14.896Z',
		});
	});
});

describe('isString', () => {
	test('should return true if it is a string', () => {
		const testValue: unknown = 'test';
		expect(isString(testValue)).toBe(true);
	});

	test('should return false if it is not a string', () => {
		const testValue: unknown = false;
		expect(isString(testValue)).toBe(false);
	});
});

describe('isNumber', () => {
	test('should return true if it is a number', () => {
		const testValue: unknown = 1;
		expect(isNumber(testValue)).toBe(true);
	});

	test('should return false if it is not a number', () => {
		const testValue: unknown = false;
		expect(isNumber(testValue)).toBe(false);
	});
});

describe('isBoolean', () => {
	test('should return true if it is a boolean', () => {
		const testValue: unknown = true;
		expect(isBoolean(testValue)).toBe(true);
	});

	test('should return false if it is not a number', () => {
		const testValue: unknown = '';
		expect(isBoolean(testValue)).toBe(false);
	});
});

describe('isObject', () => {
	test('should return true if it is a object', () => {
		const testValue: unknown = { something: 'test' };
		expect(isObject(testValue)).toBe(true);
	});

	test('should return false if it is not a object', () => {
		const testValue: unknown = '';
		expect(isObject(testValue)).toBe(false);
	});

	test('should return false if it is null', () => {
		const testValue: unknown = null;
		expect(isObject(testValue)).toBe(false);
	});
});

describe('isArray', () => {
	test('should return true if it is a array', () => {
		const testValue: unknown = [];
		expect(isArray(testValue)).toBe(true);
	});

	test('should return false if it is not a array', () => {
		const testValue: unknown = '';
		expect(isArray(testValue)).toBe(false);
	});
});
