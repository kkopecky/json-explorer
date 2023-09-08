import { TNodeFlat, TNodeFlatArray, TNodeObject, TNodeValue } from './types';

const isString = (value: unknown): value is string => typeof value === 'string';
const isNumber = (value: unknown): value is number => typeof value === 'number';
const isBoolean = (value: unknown): value is boolean =>
	typeof value === 'boolean';
const isObject = (value: unknown): value is Record<string, unknown> =>
	value instanceof Object && value !== null;
const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

const mapJsonToTNode = (
	parentPath: string,
	jsonNode: unknown | unknown[]
): TNodeValue | TNodeObject | TNodeValue[] | null => {
	if (isArray(jsonNode)) {
		const nodes: TNodeValue[] = jsonNode
			.map((nodeItem: unknown, index: number) =>
				mapJsonToTNode(`${parentPath}[${index}]`, nodeItem)
			)
			.filter((node) => node !== null) as TNodeValue[];
		if (nodes.length > 0) {
			return nodes;
		} else {
			return null;
		}
	} else if (isObject(jsonNode)) {
		const nodeTree: TNodeObject = {};
		for (const [key, value] of Object.entries(jsonNode)) {
			const node = mapJsonToTNode(`${parentPath}.${key}`, value);
			if (node) {
				nodeTree[key] = node;
			}
		}
		return nodeTree;
	} else if (isString(jsonNode) || isNumber(jsonNode) || isBoolean(jsonNode)) {
		return mapUnknownToTNode(parentPath, jsonNode);
	}

	return null;
};

const getTNodeTree = (json: unknown): TNodeObject => {
	const nodeTree: TNodeObject = {};

	if (isObject(json)) {
		for (const [key, value] of Object.entries(json)) {
			const node = mapJsonToTNode(`res.${key}`, value);
			if (node) {
				nodeTree[key] = node;
			}
		}
	}
	return nodeTree;
};

const mapUnknownToTNode = (
	path: string,
	value: string | number | boolean,
	key?: string
): TNodeValue => ({ path, value, key });

const mapTNodeValueToFlatTNodeTree = (
	path: string,
	value: string | number | boolean
): TNodeFlat => ({
	path,
	value,
});

const mapToFlatNode = (
	parentPath: string,
	jsonNode: unknown | unknown[]
): TNodeFlat | TNodeFlatArray => {
	if (jsonNode && isArray(jsonNode)) {
		const nodes: TNodeFlatArray = [];
		for (let index = 0; index < jsonNode.length; index++) {
			const nodeItem = jsonNode[index];
			const node = mapToFlatNode(`${parentPath}[${index}]`, nodeItem);
			if (node) {
				nodes.push(...(isArray(node) ? node : [node]));
			}
		}
		return nodes.length > 0 ? nodes : [];
	} else if (isObject(jsonNode)) {
		const nodeTreeArray: TNodeFlatArray = [];
		for (const [key, value] of Object.entries(jsonNode)) {
			const node = mapToFlatNode(`${parentPath}.${key}`, value);
			if (node) {
				nodeTreeArray.push(...(isArray(node) ? node : [node]));
			}
		}
		return nodeTreeArray;
	} else if (isString(jsonNode) || isNumber(jsonNode) || isBoolean(jsonNode)) {
		return [mapTNodeValueToFlatTNodeTree(parentPath, jsonNode)];
	}

	return [];
};

const getFlatTNodeTree = (json: unknown): TNodeFlat[] => {
	const nodeArray: TNodeFlatArray = [];

	if (isObject(json)) {
		for (const [key, value] of Object.entries(json)) {
			const node = mapToFlatNode(`res.${key}`, value);
			if (node) {
				nodeArray.push(...(isArray(node) ? node : [node])); // Use push to concatenate arrays
			}
		}
	}

	return nodeArray;
};

export {
	getTNodeTree,
	getFlatTNodeTree,
	mapUnknownToTNode,
	mapTNodeValueToFlatTNodeTree,
	isString,
	isNumber,
	isBoolean,
	isObject,
	isArray,
};
