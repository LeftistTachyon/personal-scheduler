import {
	Box,
	Center,
	Divider,
	Grid,
	Icon,
	SimpleGrid,
	Stack,
	StackProps,
	Text,
	useInterval,
	VStack,
} from "@chakra-ui/react";
import NextChakraLink from "@components/nextChakraLink";
import TodoItem from "@components/todoItem";
import { DateTime } from "luxon";
import { cloneElement, useEffect, useReducer, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { TodoItemData } from "types";

const shownHours: string[] = [
	"0:00",
	"1:00",
	"2:00",
	"3:00",
	"4:00",
	"5:00",
	"6:00",
	"7:00",
	"8:00",
	"9:00",
	"10:00",
	"11:00",
	"12:00",
	"13:00",
	"14:00",
	"15:00",
	"16:00",
	"17:00",
	"18:00",
	"19:00",
	"20:00",
	"21:00",
	"22:00",
	"23:00",
];

// const initialList: TodoItemData[] = [
// 	{
// 		title: "GFCGFHBKJNHTBHK",
// 		description:
// 			"This is a lengthy description that only exists to take up an extremely unnecessary amount of space and appear as though that I put many hours of effort into the descriptions of these tasks.",
// 		isFixed: false,
// 		duration: Duration.fromObject({ hour: 1 }),
// 	},
// ];

export default function Home() {
	const [taskNum, setTaskNum] = useState(0);

	function reducer(state: TodoItemData[], action: any): TodoItemData[] {
		switch (action.action) {
			case "remove":
				// console.log(
				// 	"Remove",
				// 	action.idx,
				// 	"from list of length",
				// 	state.length
				// );
				// console.log(
				// 	state.slice(0, action.idx),
				// 	"+",
				// 	state.slice(action.idx + 1)
				// );

				// let output = state
				// 	.slice(0, action.idx)
				// 	.concat(state.slice(action.idx + 1));
				// console.log("state:", output);
				// return output;

				return state
					.slice(0, action.idx)
					.concat(state.slice(action.idx + 1));
			case "add":
				if (action.item) {
					return state.concat([action.item]);
				} else {
					// console.log(state);
					setTaskNum(taskNum + 1);
					return state.concat([
						{
							title: "Example Task " + taskNum,
							description: "Click the pencil below to edit me!",
							duration: 30,
							isFixed: false,
						},
					]);
				}
			case "set":
				// console.log(
				// 	state.slice(0, action.idx),
				// 	"+",
				// 	action.item,
				// 	"+",
				// 	state.slice(action.idx + 1)
				// );

				// output = state
				// 	.slice(0, action.idx)
				// 	.concat(state.slice(action.idx + 1));
				// console.log("after set:", output);
				// return output;

				return state
					.slice(0, action.idx)
					.concat([action.item])
					.concat(state.slice(action.idx + 1));
			default:
				console.error("DEFAULT BLOCK IN REDUCER REACHED");
				return null;
		}
	}

	const [todoItems, changeTodo] = useReducer(reducer, []);

	const [now, setNow] = useState(DateTime.now());
	useEffect(() => {
		setNow(DateTime.now());
	}, []);
	useInterval(() => {
		setNow(DateTime.now());
	}, 60_000);

	const percentage = (now.hour * 60 + now.minute + now.second / 60.0) / 14.4;
	// console.log("Redrawn", percentage);

	return (
		<Stack
			spacing={10}
			justifySelf="stretch"
			align="stretch"
			direction="row"
			position="relative"
			p={10}
			minW="100%"
			minH="100%"
			h="fit-content"
		>
			<GridItem
				as="button"
				boxShadow="none"
				color="transparent"
				bg="transparent"
			>
				<Text>&lt;</Text>
			</GridItem>
			<GridItem
				flex={1}
				align="stretch"
				alignSelf="flex-start"
				h="100%"
				position="sticky"
				top="0%"
				p={5}
			>
				<Grid
					templateColumns="auto minmax(0, 1fr)"
					columnGap={2}
					h="100%"
					position="relative"
				>
					{shownHours.map((hour, idx) =>
						cloneElement(
							<>
								<Center textAlign="right">{hour}</Center>
								<Box
									borderColor="black"
									borderTopWidth={1}
									borderBottomWidth={
										idx + 1 == shownHours.length ? 1 : 0
									}
								/>
							</>,
							{ key: hour }
						)
					)}
					<Divider
						borderColor="red"
						position="absolute"
						gridColumn={2}
						top={percentage + "%"}
					/>
				</Grid>
			</GridItem>
			<VStack flex={{ base: 2, lg: 3 }} align="stretch" spacing={7}>
				<Box flex={1}>
					<SimpleGrid
						columns={{ base: 1, lg: 2, xl: 3 }}
						spacing={10}
					>
						{todoItems
							.filter((item) => !item.isFixed)
							.map((item, idx) => {
								return (
									<TodoItem
										data={item}
										onDelete={() => {
											changeTodo({
												action: "remove",
												idx,
											});
										}}
										onSave={(data) => {
											const json = JSON.stringify(data);
											const index = todoItems
												.map((item) =>
													JSON.stringify(item)
												)
												.findIndex((s) => s === json);
											const isUnique =
												index == -1 || index == idx;

											if (isUnique) {
												changeTodo({
													action: "set",
													item: data,
													idx,
												});
											}

											return isUnique;
										}}
										key={JSON.stringify(item)}
									/>
								);
							})}
					</SimpleGrid>
				</Box>
				<GridItem
					as="button"
					onClick={() => changeTodo({ action: "add" })}
				>
					<Text>Add</Text>
				</GridItem>
				<GridItem direction="row">
					<Text>Created by LeftistTachyon</Text>
					<NextChakraLink href="https://github.com/LeftistTachyon/">
						<Center>
							<Icon as={FaGithub} boxSize={5} />
						</Center>
					</NextChakraLink>
				</GridItem>
			</VStack>
			<GridItem
				as="button"
				alignSelf="flex-start"
				position="sticky"
				top="50%"
			>
				<Text>&gt;</Text>
			</GridItem>
		</Stack>
	);
}

function GridItem(props: StackProps): JSX.Element {
	return (
		<Stack
			rounded={30}
			bg="primary"
			boxShadow="10px 10px 20px #adc4cf, -10px -10px 20px #ebffff"
			padding={2.5}
			justify="center"
			align="center"
			direction="column"
			{...props}
		/>
	);
}
