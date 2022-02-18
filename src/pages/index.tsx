import {
	Box,
	BoxProps,
	Center,
	Divider,
	FormControl,
	FormLabel,
	Grid,
	Heading,
	HStack,
	Icon,
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	SimpleGrid,
	Stack,
	StackProps,
	Text,
	Textarea,
	useBoolean,
	useInterval,
	VStack,
} from "@chakra-ui/react";
import NextChakraLink from "@components/nextChakraLink";
import { DateTime, Duration } from "luxon";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { ChangeEvent, cloneElement, useEffect, useState } from "react";
import { FaCheck, FaEdit, FaGithub } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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

const todoItems: TodoItemData[] = [
	{
		title: "GFCGFHBKJNHTBHK",
		description:
			"This is a lengthy description that only exists to take up an extremely unnecessary amount of space and appear as though that I put many hours of effort into the descriptions of these tasks.",
		isFixed: false,
		duration: Duration.fromObject({ hour: 1 }),
	},
];

export default function Home() {
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
							.map((item) => (
								<TodoItem data={item} key={item.title} />
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

type TodoItemData = {
	title: string;
	description: string;
	isFixed: boolean;
	duration: Duration;
	startTime?: DateTime;
};
type TodoItemProps = StackProps & { data: TodoItemData };

function TodoItem({
	data: { title: defaultTitle, description: defaultDescription, duration },
	...props
}: TodoItemProps): JSX.Element {
	const [editing, setEditing] = useBoolean();
	const [title, setTitle] = useState(defaultTitle);
	const [description, setDescription] = useState(defaultDescription);
	const [minutes, setMinutes] = useState(duration.as("minutes"));
	const textRef = useRef<HTMLTextAreaElement>();

	// useEffect(() => {
	// 	if (editing) {
	// 		console.log("Editing", duration.as("hours"));
	// 		setMinutes(duration.as("minutes"));
	// 	} else {
	// 		console.log("Not editing");
	// 	}
	// }, [editing]);

	useLayoutEffect(() => {
		if (editing) {
			textRef.current.style.height = "auto";
			textRef.current.style.height = textRef.current.scrollHeight + "px";
		}
	}, [editing]);

	function updateTextareaHeight(e: ChangeEvent<HTMLTextAreaElement>) {
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
	}

	return (
		<VStack
			p={5}
			rounded={30}
			bg="primary"
			boxShadow="10px 10px 20px #adc4cf, -10px -10px 20px #ebffff"
			overflow="hidden"
			align="stretch"
			{...props}
		>
			{editing ? (
				<FormControl>
					<Heading size="md">
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							fontWeight="inherit"
							fontSize="inherit"
							variant="flushed"
						/>
					</Heading>
					<HStack>
						<NumberInput
							defaultValue={0}
							min={0}
							value={minutes}
							variant="flushed"
							onChange={(str) => {
								if (str?.length) setMinutes(Number(str));
							}}
						>
							<NumberInputField id="minutes" />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<FormLabel htmlFor="minutes">
							<Text as="i" fontWeight="normal">
								minutes
							</Text>
						</FormLabel>
					</HStack>
					<Text>
						<Textarea
							value={description}
							onInput={updateTextareaHeight}
							onChange={(e) => setDescription(e.target.value)}
							variant="flushed"
							lineHeight="inherit"
							resize="none"
							overflow="hidden"
							ref={textRef}
						/>
					</Text>
				</FormControl>
			) : (
				<Stack maxW="100%" py={2}>
					<Heading size="md">{title}</Heading>
					<Text as="i">
						{Duration.fromObject({
							hours: Math.floor(minutes / 60),
							minutes: minutes % 60 ?? null,
						}).toHuman()}
					</Text>
					<Text>{description}</Text>
				</Stack>
			)}
			<Stack direction="row" justify="center">
				<InsetButton onClick={setEditing.toggle}>
					<Icon as={editing ? FaCheck : FaEdit} boxSize={4} />
				</InsetButton>
				<InsetButton>
					<Icon as={MdDelete} boxSize={4} />
				</InsetButton>
			</Stack>
		</VStack>
	);
}

function InsetButton(props: BoxProps): JSX.Element {
	return (
		<Center
			rounded={30}
			bg="primary"
			boxShadow="inset 2px 2px 4px #adc4cf, inset -2px -2px 4px #ebffff"
			padding={2.5}
			as="button"
			{...props}
		/>
	);
}
