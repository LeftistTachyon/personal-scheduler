import {
	Box,
	Center,
	Divider,
	HStack,
	Icon,
	SimpleGrid,
	Stack,
	StackProps,
	Text,
	VStack,
} from "@chakra-ui/react";
import NextChakraLink from "@components/nextChakraLink";
import { useContainerDimensions } from "hooks/useContainerDimensions";
import { useRef } from "react";
import { FaGithub } from "react-icons/fa";

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
	const ref = useRef();
	const { height } = useContainerDimensions(ref);

	return (
		<Stack
			spacing={10}
			justifySelf="stretch"
			align="stretch"
			minW="100vw"
			p={10}
			direction="row"
		>
			<GridItem as="button">
				<Text>&lt;</Text>
			</GridItem>
			<GridItem flex={1} align="stretch">
				{/* <Stack spacing={0}>
					<Divider flex={1} />
					{shownHours.map((hour) => (
						<HStack key={hour} flex={2}>
							<Divider />
							<Text as="i">{hour}</Text>
							<Divider />
						</HStack>
					))}
					<Divider flex={1} />
				</Stack> */}
				<Box position="relative" ref={ref} h="100%">
					{shownHours.map((hour, idx) => (
						<HStack
							key={hour}
							position="absolute"
							// top={(idx * height) / shownHours.length}
							top={(100.0 * idx) / shownHours.length + "%"}
							h={100.0 / shownHours.length + "%"}
							w="100%"
						>
							<Text as="i" alignSelf="center">
								{hour}
							</Text>
							<Divider
								alignSelf="flex-start"
								borderColor="black"
							/>
						</HStack>
					))}
				</Box>
			</GridItem>
			<VStack flex={2} align="stretch" spacing={10}>
				<Box flex={1}>
					<SimpleGrid columns={2} spacing={10}>
						<GridItem></GridItem>
						<GridItem></GridItem>
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

function GridItem({ children, ...props }: StackProps): JSX.Element {
	return (
		<Stack
			rounded={30}
			background="primary"
			boxShadow="15px 15px 30px #adc4cf, -15px -15px 30px #ebffff"
			padding={2.5}
			justify="center"
			align="center"
			direction="column"
			{...props}
		>
			{children}
		</Stack>
	);
}
