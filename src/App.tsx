import { ChangeEvent, useState } from 'react';
import data from './assets/data.json';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { getFlatTNodeTree, getTNodeTree } from './component/Tree/util';
import Tree from './component/Tree/Tree';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

function App() {
	const [path, setPath] = useState('');
	const tree = getTNodeTree(data);
	const treeFlat = getFlatTNodeTree(data);
	const foundItem = treeFlat.find((item) => item.path === path);
	const result = foundItem ? foundItem.value : '';

	const onNodeClickHandler = (path: string) => {
		setPath(path);
	};

	const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPath(event.target.value);
	};

	return (
		<Container>
			<Row>
				<Col xs={5}>
					<Form.Label>Property</Form.Label>
				</Col>
				<Col xs={5}>
					<Form.Label>Block / Variable</Form.Label>
				</Col>
			</Row>
			<Row>
				<Col xs={5}>
					<Form.Control
						type="text"
						value={path}
						placeholder="Property"
						onChange={onHandleChange}
					/>
				</Col>
				<Col xs={5}>
					<Form.Control type="text" value={'Variable'} placeholder="Type" />
				</Col>
				<Col xs={2}>
					<AiOutlineMinus />
				</Col>

				<Col xs={6}>
					<Form.Label>{result}</Form.Label>
				</Col>

				<Col xs={12}>
					<Button variant="link">
						<AiOutlinePlus /> Assign to variable
					</Button>
				</Col>
				<Col xs={12}>
					<Button variant="link">
						<AiOutlinePlus /> Assign to block{' '}
					</Button>
				</Col>

				<Col xs={12}>
					<Form.Label>Response</Form.Label>
					<Tree data={tree} onClick={onNodeClickHandler} />
				</Col>
			</Row>
		</Container>
	);
}

export default App;
