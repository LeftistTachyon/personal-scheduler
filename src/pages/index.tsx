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

const verbs = [
	"Embarrass",
	"Drag",
	"Promise",
	"Clean",
	"Wash",
	"Define",
	"Insert",
	"Purchase",
	"Honor",
	"Hang",
	"Dazzle",
	"Judge",
	"Spell",
	"Hurry",
	"Weep",
	"Ring",
	"Teach",
	"Kiss",
	"Aggravate",
	"Refill",
	"Change",
	"Strike",
	"Admit",
	"Answer",
	"Inspect",
	"Smell",
	"Catch",
	"Understimate",
	"Take out",
	"Complete",
	"Enlist",
	"Describe",
	"Soften",
	"Discolor",
	"Handle",
	"Use",
	"Help",
	"Swallow",
	"Forgive",
	"Pierce",
	"Mock",
	"Grab",
	"Toss",
	"Research",
	"Intimidate",
	"Place",
	"Bother",
	"Melt",
	"Bend",
	"Drink",
];

const nouns = [
	"the ice cube tray",
	"the camera",
	"the speakers",
	"a sticky note",
	"the tweezers",
	"the soap",
	"a bookmark",
	"an eggplant",
	"the flag",
	"the street lights",
	"some notebook paper",
	"some toothpicks",
	"the washing machine",
	"my sailboat",
	"my house",
	"the pool stick",
	"some greeting cards",
	"a box",
	"a glow stick",
	"the drawer",
	"my drill press",
	"a CD",
	"a cup",
	"my cell phone",
	"my garage",
	"my pants",
	"a doll",
	"the picture frame",
	"the rusty nail",
	"my sunglasses",
	"the table",
	"my boom box",
	"the sofa",
	"a canvas",
	"the lamp shade",
	"the newspaper",
	"my credit card",
	"the air freshener",
	"my shampoo",
	"my toothpaste",
	"the knife",
	"some milk",
	"my leg warmers",
	"the coasters",
	"some carrots",
	"an apple",
	"the socks",
	"a hair tie",
	"a seat belt",
	"the key chain",
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

// function recallTaskNum(): number {
// 	console.log("localStorage:", localStorage);
// 	if (!localStorage) return 0;

// 	const retrieved = localStorage.getItem("taskNum");
// 	return retrieved ? Number(retrieved) : 0;
// }

export default function Home() {
	function reducer(state: TodoItemData[], action: any): TodoItemData[] {
		console.log("reducer called:", action);

		switch (action.action) {
			case "init":
				return action.init;
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
					const randVerb =
						verbs[Math.floor(Math.random() * verbs.length)];
					const randNoun =
						nouns[Math.floor(Math.random() * nouns.length)];
					return state.concat([
						{
							title: randVerb + " " + randNoun,
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

	const [todoItems, changeTodo] = useReducer(reducer, null);
	const [now, setNow] = useState(DateTime.now());

	useEffect(() => {
		if (todoItems !== null) {
			console.log("Saved todoItems as", todoItems);
			localStorage.setItem("todoItems", JSON.stringify(todoItems));
		}
	}, [todoItems]);
	useEffect(() => {
		// set now
		setNow(DateTime.now());

		// fetch local storage
		if (todoItems === null) {
			const saved = localStorage.getItem("todoItems");
			const initialValue = JSON.parse(saved);
			console.log("Fetched todoItems as", initialValue);
			changeTodo({ action: "init", init: initialValue || [] });
		}
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
			<Box flex={1}>
				<Stack
					position="sticky"
					top={10}
					// bottom="7vh"
					h="calc(93vh - 5rem)"
					spacing={5}
				>
					<GridItem flex={1} align="stretch" p={5}>
						<Grid
							templateColumns="auto minmax(0, 1fr)"
							columnGap={2}
							h="100%"
							position="relative"
						>
							{shownHours.map((hour, idx) =>
								cloneElement(
									<>
										<Center textAlign="right">
											{hour}
										</Center>
										<Box
											borderColor="black"
											borderTopWidth={1}
											borderBottomWidth={
												idx + 1 == shownHours.length
													? 1
													: 0
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
				</Stack>
			</Box>
			<VStack flex={{ base: 2, lg: 3 }} align="stretch" spacing={7}>
				<Box flex={1}>
					<SimpleGrid
						columns={{ base: 1, lg: 2, xl: 3 }}
						spacing={10}
					>
						{todoItems === null
							? null
							: todoItems
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
													const json =
														JSON.stringify(data);
													const index = todoItems
														.map((item) =>
															JSON.stringify(item)
														)
														.findIndex(
															(s) => s === json
														);
													const isUnique =
														index === -1 ||
														index === idx;

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
