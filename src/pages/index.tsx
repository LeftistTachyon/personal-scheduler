import {
	Box,
	BoxProps,
	Center,
	Divider,
	Grid,
	Heading,
	Icon,
	SimpleGrid,
	Stack,
	StackProps,
	Text,
	useInterval,
	VStack,
} from "@chakra-ui/react";
import NextChakraLink from "@components/nextChakraLink";
import { DateTime } from "luxon";
import React, { cloneElement, useState } from "react";
import { FaEdit, FaGithub } from "react-icons/fa";
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
	// "24:00",
];

export default function Home() {
	const [now, setNow] = useState(DateTime.now());
	useInterval(() => {
		setNow(DateTime.now());
	}, 60_000);

	const percentage = (now.hour * 60 + now.minute + now.second / 60.0) / 14.4;
	console.log("Redrawn", percentage);

	return (
		<Stack
			spacing={10}
			justifySelf="stretch"
			align="stretch"
			p={10}
			direction="row"
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
			<VStack flex={2} align="stretch" spacing={7}>
				<Box flex={1}>
					<SimpleGrid columns={2} spacing={10}>
						<TodoItem
							title="Test item 1"
							description="This is a lengthy description that only exists
								to take up an extremely unnecessary amount of
								space and appear as though that I put many hours
								of effort into the descriptions of these tasks."
						/>
						<TodoItem
							title="Test item 1"
							description="This is a lengthy description that only exists
								to take up an extremely unnecessary amount of
								space and appear as though that I put many hours
								of effort into the descriptions of these tasks."
						/>
						<TodoItem
							title="Test item 1"
							description="This is a lengthy description that only exists
								to take up an extremely unnecessary amount of
								space and appear as though that I put many hours
								of effort into the descriptions of these tasks."
						/>
						<TodoItem
							title="Test item 3"
							description="This is a lengthy description that only exists
								to take up an extremely unnecessary amount of
								space and appear as though that I put many hours
								of effort into the descriptions of these tasks."
						/>
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
			boxShadow="15px 15px 30px #adc4cf, -15px -15px 30px #ebffff"
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
};
type TodoItemProps = BoxProps & TodoItemData;

function TodoItem({
	title,
	description,
	...props
}: TodoItemProps): JSX.Element {
	return (
		<Box
			p={5}
			rounded={30}
			bg="primary"
			boxShadow="15px 15px 30px #adc4cf, -15px -15px 30px #ebffff"
			{...props}
		>
			<Stack direction="row" float="right">
				<InsetButton>
					<Icon as={FaEdit} boxSize={4} />
				</InsetButton>
				<InsetButton>
					<Icon as={MdDelete} boxSize={4} />
				</InsetButton>
			</Stack>
			<Heading size="md">{title}</Heading>
			<Text>{description}</Text>
		</Box>
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
