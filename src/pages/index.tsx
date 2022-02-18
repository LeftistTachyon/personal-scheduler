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
import { DateTime, Duration } from "luxon";
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

const initialList: TodoItemData[] = [
	{
		title: "GFCGFHBKJNHTBHK",
		description:
			"This is a lengthy description that only exists to take up an extremely unnecessary amount of space and appear as though that I put many hours of effort into the descriptions of these tasks.",
		isFixed: false,
		duration: Duration.fromObject({ hour: 1 }),
	},
];

export default function Home() {
	function reducer(state: TodoItemData[], action: any): TodoItemData[] {
		switch (action.action) {
			case "remove":
				return state
					.slice(0, action.idx)
					.concat(state.slice(action.idx + 1));
			default:
				return [];
		}
	}

	const [todoItems, changeTodo] = useReducer(reducer, initialList);

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
			p={10}
			minW="100vw"
		>
			<GridItem
				as="button"
				boxShadow="none"
				color="transparent"
				bg="transparent"
			>
				<Text>&lt;</Text>
			</GridItem>
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
							.map((item, idx) => (
								<TodoItem
									data={item}
									onDelete={() =>
										changeTodo({ action: "remove", idx })
									}
									key={item.title}
								/>
							))}
					</SimpleGrid>
				</Box>
				<GridItem as="button">
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
			<GridItem as="button">
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
