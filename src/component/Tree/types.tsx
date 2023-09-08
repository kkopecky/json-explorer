export interface TNodeValue {
	path: string;
	value:
		| string
		| number
		| boolean
		| Array<TNodeValue>
		| TNodeValue
		| TNodeObject;
	key?: string;
}
export interface TNodeObject {
	[key: string]:
		| TNodeValue
		| TNodeObject
		| Array<TNodeValue>
		| string
		| Array<TNodeObject>;
}

export interface TNodeFlat {
	path: string;
	value: string | number | boolean;
}

export type TNodeFlatArray = TNodeFlat[];
