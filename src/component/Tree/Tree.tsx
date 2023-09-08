import { TNodeObject, TNodeValue } from './types';
import styles from './Tree.module.scss';
import { ReactNode } from 'react';
import { isArray, isBoolean, isNumber, isString } from './util';

export interface JsonDisplayProps {
	onClick: (path: string) => void;
	data?: TNodeObject;
}

const Tree = ({ onClick, data }: JsonDisplayProps): ReactNode => {
	const renderNode = (
		parentKey: string,
		node: string | TNodeValue | TNodeValue[] | TNodeObject | TNodeObject[]
	) => {
		if (isArray(node)) {
			return (
				<li>
					{isString(parentKey) && `${parentKey}`}:
					<ul className={styles.isArray}>
						{node.map((item) =>
							Object.keys(item).map((key) => renderNode(key, item[key]))
						)}
					</ul>
				</li>
			);
		} else if (
			isString(node.value) ||
			isNumber(node.value) ||
			isBoolean(node.value)
		) {
			return (
				<li>
					<a href="#" onClick={() => isString(node.path) && onClick(node.path)}>
						{parentKey}
					</a>
					: {node?.value.toString()}
				</li>
			);
		}
	};

	return (
		<ul className={styles.tree}>
			{data && Object.keys(data).map((key) => renderNode(key, data[key]))}
		</ul>
	);
};

export default Tree;
